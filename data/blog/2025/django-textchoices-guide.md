# Django TextChoices: Complete Guide

A comprehensive guide to using Django's `models.TextChoices` for type-safe, maintainable choice fields.

---

## Table of Contents

1. [CharField with Choices vs TextChoices](#1-charfield-with-choices-vs-textchoices)
2. [Syntax Explanation](#2-syntax-explanation)
3. [Real-World Refactoring Example](#3-real-world-refactoring-example)
4. [Usage Examples](#4-usage-examples)
5. [Translation Support](#5-translation-support)
6. [Migrations and Database Schema](#6-migrations-and-database-schema)
7. [Best Practices](#7-best-practices)

---

## 1. CharField with Choices vs TextChoices

### Old Approach: CharField with Tuple List

```python
# models.py
ROLE_CHOICES = [
    ('owner', 'Owner'),
    ('contributor', 'Contributor'),
]

class User(models.Model):
    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default='owner'
    )
```

**Problems:**

- ❌ Magic strings everywhere: `if user.role == 'owner'`
- ❌ Typo-prone: `if user.role == 'owne'` (fails silently!)
- ❌ No IDE autocomplete
- ❌ Choices duplicated across models/forms
- ❌ Hard to refactor

### Modern Approach: TextChoices Enum

```python
# models.py
class User(models.Model):
    class UserRole(models.TextChoices):
        OWNER = 'owner', 'Owner'
        CONTRIBUTOR = 'contributor', 'Contributor'

    role = models.CharField(
        max_length=20,
        choices=UserRole.choices,
        default=UserRole.OWNER
    )
```

**Benefits:**

- ✅ Type-safe constants: `if user.role == User.UserRole.OWNER`
- ✅ IDE autocomplete for `UserRole.OWNER`, `UserRole.CONTRIBUTOR`
- ✅ Refactoring-friendly (rename OWNER → all uses update)
- ✅ Single source of truth
- ✅ Self-documenting code

### Comparison Table

| Aspect            | CharField with Choices         | TextChoices                          |
| ----------------- | ------------------------------ | ------------------------------------ |
| **Definition**    | `choices=[('owner', 'Owner')]` | `class UserRole(models.TextChoices)` |
| **Usage**         | `user.role == 'owner'`         | `user.role == User.UserRole.OWNER`   |
| **Type Safety**   | ❌ No                          | ✅ Yes                               |
| **IDE Support**   | ❌ No autocomplete             | ✅ Full autocomplete                 |
| **Refactoring**   | ❌ Find/replace strings        | ✅ IDE refactors all                 |
| **Documentation** | ❌ Scattered                   | ✅ Self-documenting                  |
| **Access Label**  | Hard                           | `UserRole.OWNER.label` → `'Owner'`   |
| **Access Value**  | `'owner'`                      | `UserRole.OWNER.value` → `'owner'`   |

---

## 2. Syntax Explanation

### The Grammar

```python
OWNER = 'owner', _('Owner')
#       ^^^^^^   ^^^^^^^^^^
#       value    label
```

This is **tuple assignment** (parentheses optional):

```python
OWNER = ('owner', _('Owner'))  # Equivalent, explicit form
```

### How Django Processes It

1. Creates enum member named `OWNER`
2. Sets `.value` = `'owner'` (database value)
3. Sets `.label` = `_('Owner')` (human-readable label)

### What is `_()`?

```python
from django.utils.translation import gettext_lazy as _

class UserRole(models.TextChoices):
    OWNER = 'owner', _('Owner')  # Translation-ready
```

- `_()` marks strings for translation
- With `USE_I18N = False`: Just returns the string unchanged
- With `USE_I18N = True`: Returns translated string based on active language
- Lazy evaluation: Translation happens when accessed, not when defined

### Alternative Syntaxes

```python
# Format 1: Value + Label (recommended)
OWNER = 'owner', _('Owner')

# Format 2: Value only (auto-generates label)
OWNER = 'owner'  # Label becomes 'Owner' (capitalized)

# Format 3: Value + Label + Name (rarely used)
OWNER = 'owner', _('Owner'), 'OWNER'
```

---

## 3. Real-World Refactoring Example

### Before: Duplicated Across Files

**models.py:**

```python
ROLE_CHOICES = [
    ('owner', 'Owner'),
    ('contributor', 'Contributor'),
]

role = models.CharField(
    choices=ROLE_CHOICES,
    max_length=20,
    default='owner'
)
```

**forms.py:**

```python
class UserSignupForm(forms.Form):
    role = forms.ChoiceField(
        choices=[('owner', 'Owner'), ('contributor', 'Contributor')],
        initial='owner'
    )

    def save(self):
        role = self.cleaned_data.get('role', 'owner')  # Magic string
        user = User.objects.create_user(..., role=role)
```

**Problem:** Choices defined in **3 different places**!

### After: Single Source of Truth

**models.py:**

```python
class User(models.Model):
    class UserRole(models.TextChoices):
        OWNER = 'owner', _('Owner')
        CONTRIBUTOR = 'contributor', _('Contributor')

    role = models.CharField(
        choices=UserRole.choices,
        max_length=20,
        default=UserRole.OWNER
    )
```

**forms.py:**

```python
from users.models import User

class UserSignupForm(forms.Form):
    role = forms.ChoiceField(
        choices=User.UserRole.choices,      # Reuses from model
        initial=User.UserRole.OWNER         # Type-safe constant
    )

    def save(self):
        role = self.cleaned_data.get('role', User.UserRole.OWNER)
        user = User.objects.create_user(..., role=role)
```

**Result:** Choices defined **once**, reused everywhere!

---

## 4. Usage Examples

### Creating and Querying

```python
# Create user with owner role
user = User.objects.create(
    email='test@example.com',
    role=User.UserRole.OWNER  # Type-safe!
)

# Query by role
owners = User.objects.filter(role=User.UserRole.OWNER)

# Check user's role
if user.role == User.UserRole.OWNER:
    print("User is an owner")

# Still works with strings (for backwards compatibility)
if user.role == 'owner':
    print("User is an owner")
```

### Accessing Enum Properties

```python
# Get the database value
User.UserRole.OWNER.value
# Output: 'owner'

# Get the human-readable label
User.UserRole.OWNER.label
# Output: 'Owner'

# String representation (equals .value)
str(User.UserRole.OWNER)
# Output: 'owner'

# Get all choices (for form dropdowns)
User.UserRole.choices
# Output: [('owner', 'Owner'), ('contributor', 'Contributor')]

# Get choice names
User.UserRole.names
# Output: ['OWNER', 'CONTRIBUTOR']

# Get choice values
User.UserRole.values
# Output: ['owner', 'contributor']

# Get choice labels
User.UserRole.labels
# Output: ['Owner', 'Contributor']
```

### In Templates

```django
<!-- Display the label -->
<p>Role: {{ user.get_role_display }}</p>
<!-- Output: "Role: Owner" -->

<!-- Loop through choices -->
<select name="role">
  {% for value, label in form.fields.role.choices %}
    <option value="{{ value }}">{{ label }}</option>
  {% endfor %}
</select>
```

### In Forms

```python
# Django automatically creates dropdown from choices
class UserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['email', 'role']
    # 'role' field automatically gets dropdown with OWNER/CONTRIBUTOR

# Access in form validation
def clean_role(self):
    role = self.cleaned_data['role']
    if role == User.UserRole.CONTRIBUTOR:
        # Custom validation for contributors
        pass
    return role
```

---

## 5. Translation Support

### Basic Setup (if needed in the future)

**1. Enable i18n in settings:**

```python
# settings.py
USE_I18N = True  # Enable translations

LANGUAGES = [
    ('en', 'English'),
    ('es', 'Spanish'),
    ('fr', 'French'),
]

LOCALE_PATHS = [BASE_DIR / 'locale']
```

**2. Generate translation files:**

```bash
python manage.py makemessages -l es  # Spanish
python manage.py makemessages -l fr  # French
```

**3. Edit translation files:**

```po
# locale/es/LC_MESSAGES/django.po
msgid "Owner"
msgstr "Propietario"

msgid "Contributor"
msgstr "Colaborador"
```

**4. Compile translations:**

```bash
python manage.py compilemessages
```

**5. Activate language:**

```python
from django.utils.translation import activate

activate('es')
print(User.UserRole.OWNER.label)  # Output: "Propietario"

activate('fr')
print(User.UserRole.OWNER.label)  # Output: "Propriétaire"
```

### Current Label Studio Configuration

```python
# Label Studio has translations disabled
USE_I18N = False

# So _('Owner') just returns 'Owner' unchanged
# But it's still good practice to use _() for future-proofing!
```

---

## 6. Migrations and Database Schema

### Do You Need a Migration When Switching to TextChoices?

**Answer: NO** ❌

### Why Not?

The `choices` parameter is **Python metadata only** - it doesn't affect the database schema.

**Before:**

```python
ROLE_CHOICES = [('owner', 'Owner'), ('contributor', 'Contributor')]
role = models.CharField(choices=ROLE_CHOICES, default='owner')
```

**After:**

```python
class UserRole(models.TextChoices):
    OWNER = 'owner', _('Owner')
    CONTRIBUTOR = 'contributor', _('Contributor')

role = models.CharField(choices=UserRole.choices, default=UserRole.OWNER)
```

**Database sees (identical for both):**

```sql
ALTER TABLE htx_user ADD COLUMN role VARCHAR(20) DEFAULT 'owner';
```

### What Affects Database Schema?

| Change                                         | Requires Migration?     |
| ---------------------------------------------- | ----------------------- |
| Add/remove choices                             | ❌ No                   |
| Change choice labels                           | ❌ No                   |
| Change from list to TextChoices                | ❌ No                   |
| Change field type (CharField → IntegerField)   | ✅ Yes                  |
| Change max_length                              | ✅ Yes                  |
| Add database constraint (unique=True)          | ✅ Yes                  |
| Change default value                           | ✅ Yes                  |
| Change choice VALUES (e.g., 'owner' → 'admin') | ⚠️ Yes (data migration) |

### Verify No Migration Needed

```bash
python manage.py makemigrations --dry-run users
# Output: "No changes detected in app 'users'"
```

---

## 7. Best Practices

### ✅ DO

1. **Use TextChoices for all choice fields:**

   ```python
   class Status(models.TextChoices):
       DRAFT = 'draft', 'Draft'
       PUBLISHED = 'published', 'Published'
   ```

2. **Define choices inside the model class:**

   ```python
   class User(models.Model):
       class UserRole(models.TextChoices):  # Nested class
           OWNER = 'owner', 'Owner'
   ```

3. **Use translation markers `_()` even if not translating yet:**

   ```python
   OWNER = 'owner', _('Owner')  # Future-proof
   ```

4. **Use constants in code, not strings:**

   ```python
   if user.role == User.UserRole.OWNER:  # ✅ Good
       pass
   ```

5. **Keep database values simple (lowercase, no spaces):**
   ```python
   OWNER = 'owner', 'Owner'  # Value: 'owner', Label: 'Owner'
   ```

### ❌ DON'T

1. **Don't use magic strings:**

   ```python
   if user.role == 'owner':  # ❌ Avoid (typo-prone)
       pass
   ```

2. **Don't duplicate choices across files:**

   ```python
   # ❌ Bad - duplicated in forms.py
   choices=[('owner', 'Owner'), ('contributor', 'Contributor')]
   ```

3. **Don't change choice VALUES after deployment:**

   ```python
   # ⚠️ Breaking change - requires data migration
   OWNER = 'admin', 'Owner'  # Changed from 'owner' to 'admin'
   ```

4. **Don't use database values as labels:**
   ```python
   OWNER = 'owner', 'owner'  # ❌ Use 'Owner' for better UX
   ```

### IntegerChoices vs TextChoices

```python
# Use TextChoices for human-readable values
class Status(models.TextChoices):
    DRAFT = 'draft', 'Draft'        # Stored as: 'draft'
    PUBLISHED = 'published', 'Published'  # Stored as: 'published'

# Use IntegerChoices for numeric codes
class Priority(models.IntegerChoices):
    LOW = 1, 'Low'          # Stored as: 1
    MEDIUM = 2, 'Medium'    # Stored as: 2
    HIGH = 3, 'High'        # Stored as: 3
```

**When to use IntegerChoices:**

- API compatibility requires numeric values
- Legacy database uses integers
- Performance-critical (integers are slightly faster)

**When to use TextChoices:**

- Values should be human-readable in database
- Debugging (easier to understand 'draft' vs 1)
- Most new projects (recommended default)

---

## Summary

**TextChoices provides:**

- ✅ Type safety with IDE autocomplete
- ✅ Single source of truth for choices
- ✅ Built-in translation support
- ✅ No database migration needed to refactor
- ✅ Self-documenting code

**Migration from old-style choices:**

1. Replace `CHOICES = [...]` with `class MyChoices(models.TextChoices)`
2. Update `choices=CHOICES` to `choices=MyChoices.choices`
3. Update `default='value'` to `default=MyChoices.VALUE`
4. Replace magic strings with enum constants in code
5. Verify: `python manage.py makemigrations --dry-run` (should show no changes)

**Result:** Cleaner, safer, more maintainable Django code! 🎉
