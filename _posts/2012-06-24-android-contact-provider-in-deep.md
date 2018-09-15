---
layout: post
title: "Android Contacts Provider In Deep"
tags: [android]
---



Android contact API uses Content Provider to provide data for application. The service is provided by `com.android.providers.contacts`. All the contact data are stored in SQLite database. You can find all the data under `/data/data/com.android.providers.contacts/databases`, as following:

```bash 
# adb shell 
root@android:/data/data/com.android.providers.contacts/databases # ls
contacts2.db
contacts2.db-journal
contacts2.db-mj6E07C4A4
profile.db
profile.db-journal
```

The most important and the central database here is `contacts2.db`. To view what's in this database, you can utilize the tool called `sqlite3` provided by Google. This is the [link](http://developer.android.com/tools/help/sqlite3.html) to the official description of the tool.  This tool is under /system/bin/ by default in Android. But in case you cannot find it on you device, you can use Eclipse SQLite Plugin to visualize the table structure and data. See this article [Browse an Android Emulator SQLite Database in Eclipse](http://www.tylerfrankenstein.com/browse-android-emulator-sqlite-database-eclipse)for help. 

To view the db under command line, execute: 

```bash 
# sqlite3 contacts2.db 

sqlite> .tables
_sync_state               phone_lookup              view_data              
_sync_state_metadata      photo_files               view_data_usage_stat   
accounts                  properties                view_entities          
activities                raw_contacts              view_groups            
agg_exceptions            search_index              view_raw_contacts      
android_metadata          search_index_content      view_raw_entities      
calls                     search_index_docsize      view_stream_items      
contacts                  search_index_segdir       view_v1_contact_methods
data                      search_index_segments     view_v1_extensions     
data_usage_stat           search_index_stat         view_v1_group_membership
default_directory         settings                  view_v1_groups         
directories               status_updates            view_v1_organizations  
groups                    stream_item_photos        view_v1_people         
mimetypes                 stream_items              view_v1_phones         
name_lookup               t9_lookup                 view_v1_photos         
nickname_lookup           v1_settings               visible_contacts       
packages                  view_contacts             voicemail_status  
```

3 most important tables are `contacts`, `raw_contacts` and `data`.

For a explaination of these 3 tables, see [Contact Provider](http://developer.android.com/guide/topics/providers/contacts-provider.html)

Let's take a look at the schema of the tables: 

```bash 
sqlite> .schema contacts
CREATE TABLE contacts (_id INTEGER PRIMARY KEY AUTOINCREMENT,name_raw_contact_id INTEGER REFERENCES raw_contacts(_id),photo_id INTEGER REFERENCES data(_id),photo_file_id INTEGER REFERENCES photo_files(_id),custom_ringtone TEXT,send_to_voicemail INTEGER NOT NULL DEFAULT 0,times_contacted INTEGER NOT NULL DEFAULT 0,last_time_contacted INTEGER,starred INTEGER NOT NULL DEFAULT 0,has_phone_number INTEGER NOT NULL DEFAULT 0,lookup TEXT,company TEXT,nickname TEXT,contact_account_type TEXT,status_update_id INTEGER REFERENCES data(_id));
CREATE INDEX contacts_has_phone_index ON contacts (has_phone_number);
CREATE INDEX contacts_name_raw_contact_id_index ON contacts (name_raw_contact_id);
```

```bash 
sqlite> .schema raw_contacts
CREATE TABLE raw_contacts (_id INTEGER PRIMARY KEY AUTOINCREMENT,account_name STRING DEFAULT NULL, account_type STRING DEFAULT NULL, data_set STRING DEFAULT NULL, sourceid TEXT,raw_contact_is_read_only INTEGER NOT NULL DEFAULT 0,version INTEGER NOT NULL DEFAULT 1,dirty INTEGER NOT NULL DEFAULT 0,deleted INTEGER NOT NULL DEFAULT 0,contact_id INTEGER REFERENCES contacts(_id),aggregation_mode INTEGER NOT NULL DEFAULT 0,aggregation_needed INTEGER NOT NULL DEFAULT 1,custom_ringtone TEXT,send_to_voicemail INTEGER NOT NULL DEFAULT 0,times_contacted INTEGER NOT NULL DEFAULT 0,last_time_contacted INTEGER,starred INTEGER NOT NULL DEFAULT 0,display_name TEXT,display_name_alt TEXT,display_name_source INTEGER NOT NULL DEFAULT 0,phonetic_name TEXT,phonetic_name_style TEXT,sort_key TEXT COLLATE PHONEBOOK,sort_key_alt TEXT COLLATE PHONEBOOK,sort_key_custom TEXT COLLATE PHONEBOOK,name_verified INTEGER NOT NULL DEFAULT 0,sync1 TEXT, sync2 TEXT, sync3 TEXT, sync4 TEXT );
CREATE INDEX raw_contact_sort_key1_index ON raw_contacts (sort_key);
CREATE INDEX raw_contact_sort_key2_index ON raw_contacts (sort_key_alt);
CREATE INDEX raw_contact_sort_key_custom_index ON raw_contacts (sort_key_custom);
CREATE INDEX raw_contacts_contact_id_index ON raw_contacts (contact_id);
CREATE INDEX raw_contacts_source_id_data_set_index ON raw_contacts (sourceid, account_type, account_name, data_set);
CREATE INDEX raw_contacts_source_id_index ON raw_contacts (sourceid, account_type, account_name);
CREATE TRIGGER raw_contacts_deleted    BEFORE DELETE ON raw_contacts BEGIN    DELETE FROM data     WHERE raw_contact_id=OLD._id;   DELETE FROM agg_exceptions     WHERE raw_contact_id1=OLD._id        OR raw_contact_id2=OLD._id;   DELETE FROM visible_contacts     WHERE _id=OLD.contact_id       AND (SELECT COUNT(*) FROM raw_contacts            WHERE contact_id=OLD.contact_id           )=1;   DELETE FROM default_directory     WHERE _id=OLD.contact_id       AND (SELECT COUNT(*) FROM raw_contacts            WHERE contact_id=OLD.contact_id           )=1;   DELETE FROM contacts     WHERE _id=OLD.contact_id       AND (SELECT COUNT(*) FROM raw_contacts            WHERE contact_id=OLD.contact_id           )=1; END;
CREATE TRIGGER raw_contacts_marked_deleted    AFTER UPDATE ON raw_contacts BEGIN    UPDATE raw_contacts     SET version=OLD.version+1      WHERE _id=OLD._id       AND NEW.deleted!= OLD.deleted; END;
```

```bash 
sqlite> .schema data
CREATE TABLE data (_id INTEGER PRIMARY KEY AUTOINCREMENT,package_id INTEGER REFERENCES package(_id),mimetype_id INTEGER REFERENCES mimetype(_id) NOT NULL,raw_contact_id INTEGER REFERENCES raw_contacts(_id) NOT NULL,is_read_only INTEGER NOT NULL DEFAULT 0,is_primary INTEGER NOT NULL DEFAULT 0,is_super_primary INTEGER NOT NULL DEFAULT 0,data_version INTEGER NOT NULL DEFAULT 0,data1 TEXT,data2 TEXT,data3 TEXT,data4 TEXT,data5 TEXT,data6 TEXT,data7 TEXT,data8 TEXT,data9 TEXT,data10 TEXT,data11 TEXT,data12 TEXT,data13 TEXT,data14 TEXT,data15 TEXT,data_sync1 TEXT, data_sync2 TEXT, data_sync3 TEXT, data_sync4 TEXT );
CREATE INDEX data_mimetype_data1_index ON data (mimetype_id,data1);
CREATE INDEX data_raw_contact_id ON data (raw_contact_id);
CREATE TRIGGER data_deleted BEFORE DELETE ON data BEGIN    UPDATE raw_contacts     SET version=version+1      WHERE _id=OLD.raw_contact_id;   DELETE FROM phone_lookup     WHERE data_id=OLD._id;   DELETE FROM status_updates     WHERE status_update_data_id=OLD._id;   DELETE FROM name_lookup     WHERE data_id=OLD._id; END;
CREATE TRIGGER data_updated AFTER UPDATE ON data BEGIN    UPDATE data     SET data_version=OLD.data_version+1      WHERE _id=OLD._id;   UPDATE raw_contacts     SET version=version+1      WHERE _id=OLD.raw_contact_id; END;

```



To visiualize the table, here is the screen short from Eclipse SQlite Plugin:

![contacts table](/imgs/8c440d12df2a8bb8a7b680760caa1fc5.jpeg "contacts table")


![raw_contacts table](/imgs/1f4498dfd10cb507e2f1675cf81d393d.jpeg "raw_contacts table")


![data table](/imgs/756d755e09fc682fe5f6814f73edb0ca.jpeg "data table")





