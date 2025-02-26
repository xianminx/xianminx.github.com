---
layout: post
title: 'Android Content Provider'
tags: [java]
---

<small class="meta final">
<a href = "http://xianminx.github.com/">Lucas Xu</a>  
</small>

ContactProvider

Table `ContactsContract.RawContacts`

| Column Name | example |                                                                                                                              description                                                                                                                               |
| :---------- | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| long \_ID   |         |                                       Row ID. Sync adapters should try to preserve row IDs during updates. In other words, it is much better for a sync adapter to update a raw contact rather than to delete and re-insert it.                                        |
| CONTACT_ID  |         | read-only The ID of the row in the ContactsContract.Contacts table that this raw contact belongs to. Raw contacts are linked to contacts by the aggregation process, which can be controlled by the AGGREGATION_MODE field and ContactsContract.AggregationExceptions. |

int AGGREGATION_MODE read/write A mechanism that allows programmatic control of the aggregation process. The allowed values are AGGREGATION_MODE_DEFAULT, AGGREGATION_MODE_DISABLED and AGGREGATION_MODE_SUSPENDED. See also ContactsContract.AggregationExceptions.
int DELETED read/write The "deleted" flag: "0" by default, "1" if the row has been marked for deletion. When delete(Uri, String, String[]) is called on a raw contact, it is marked for deletion and removed from its aggregate contact. The sync adaptor deletes the raw contact on the server and then calls ContactResolver.delete once more, this time passing the CALLER_IS_SYNCADAPTER query parameter to finalize the data removal.
int TIMES_CONTACTED read/write The number of times the contact has been contacted. To have an effect on the corresponding value of the aggregate contact, this field should be set at the time the raw contact is inserted. After that, this value is typically updated via markAsContacted(ContentResolver, long).
long LAST_TIME_CONTACTED read/write The timestamp of the last time the contact was contacted. To have an effect on the corresponding value of the aggregate contact, this field should be set at the time the raw contact is inserted. After that, this value is typically updated via markAsContacted(ContentResolver, long).
int STARRED read/write An indicator for favorite contacts: '1' if favorite, '0' otherwise. Changing this field immediately affects the corresponding aggregate contact: if any raw contacts in that aggregate contact are starred, then the contact itself is marked as starred.
String CUSTOM_RINGTONE read/write A custom ringtone associated with a raw contact. Typically this is the URI returned by an activity launched with the ACTION_RINGTONE_PICKER intent. To have an effect on the corresponding value of the aggregate contact, this field should be set at the time the raw contact is inserted. To set a custom ringtone on a contact, use the field Contacts.CUSTOM_RINGTONE instead.
int SEND_TO_VOICEMAIL read/write An indicator of whether calls from this raw contact should be forwarded directly to voice mail ('1') or not ('0'). To have an effect on the corresponding value of the aggregate contact, this field should be set at the time the raw contact is inserted.
String ACCOUNT_NAME read/write-once The name of the account instance to which this row belongs, which when paired with ACCOUNT_TYPE identifies a specific account. For example, this will be the Gmail address if it is a Google account. It should be set at the time the raw contact is inserted and never changed afterwards.
String ACCOUNT_TYPE read/write-once
The type of account to which this row belongs, which when paired with ACCOUNT_NAME identifies a specific account. It should be set at the time the raw contact is inserted and never changed afterwards.

To ensure uniqueness, new account types should be chosen according to the Java package naming convention. Thus a Google account is of type "com.google".

String DATA_SET read/write-once
The data set within the account that this row belongs to. This allows multiple sync adapters for the same account type to distinguish between each others' data. The combination of ACCOUNT_TYPE, ACCOUNT_NAME, and DATA_SET identifies a set of data that is associated with a single sync adapter.

This is empty by default, and is completely optional. It only needs to be populated if multiple sync adapters are entering distinct data for the same account type and account name.

It should be set at the time the raw contact is inserted and never changed afterwards.

String SOURCE_ID read/write String that uniquely identifies this row to its source account. Typically it is set at the time the raw contact is inserted and never changed afterwards. The one notable exception is a new raw contact: it will have an account name and type (and possibly a data set), but no source id. This indicates to the sync adapter that a new contact needs to be created server-side and its ID stored in the corresponding SOURCE_ID field on the phone.
int VERSION read-only Version number that is updated whenever this row or its related data changes. This field can be used for optimistic locking of a raw contact.
int DIRTY read/write Flag indicating that VERSION has changed, and this row needs to be synchronized by its owning account. The value is set to "1" automatically whenever the raw contact changes, unless the URI has the CALLER_IS_SYNCADAPTER query parameter specified. The sync adapter should always supply this query parameter to prevent unnecessary synchronization: user changes some data on the server, the sync adapter updates the contact on the phone (without the CALLER_IS_SYNCADAPTER flag) flag, which sets the DIRTY flag, which triggers a sync to bring the changes to the server.
String SYNC1 read/write Generic column provided for arbitrary use by sync adapters. The content provider stores this information on behalf of the sync adapter but does not interpret it in any way.
String SYNC2 read/write Generic column for use by sync adapters.
String SYNC3 read/write Generic column for use by sync adapters.
String SYNC4 read/write Generic column for use by sync adapters.
