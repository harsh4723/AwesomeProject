package com.awesomeproject;

import android.content.ContentResolver;
import android.content.Context;
import android.database.Cursor;
import android.net.Uri;
import android.provider.ContactsContract;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;
import com.facebook.react.bridge.Callback;

public class WhatsAppCheckModule extends ReactContextBaseJavaModule {
    Context ct;
    WhatsAppCheckModule(ReactApplicationContext context) {
        super(context);
        ct = context;
    }

    @NonNull
    @Override
    public String getName() {
        return "WhatsAppCheckModule";
    }

    @ReactMethod
    public void checkIsWhatsapp(String name, String phoneNumber,Callback callBack) {
        String st = "Send to script " +name;

        String contactId = null;
        String rowContactId = null;
        boolean hasWhatsApp= false;
        if(phoneNumber !=null && phoneNumber.length()>0){

            ContentResolver contentResolver = ct.getContentResolver();
            Uri uri = Uri.withAppendedPath(ContactsContract.PhoneLookup.CONTENT_FILTER_URI,Uri.decode(phoneNumber));
            String[] projection = new String[] {ContactsContract.PhoneLookup._ID};
            Cursor cursor = contentResolver.query(uri,projection,null,null,null);
            if(cursor !=null){
                while(cursor.moveToNext()){
                    contactId = cursor.getString(cursor.getColumnIndexOrThrow(ContactsContract.PhoneLookup._ID));
                }
                cursor.close();

            }

            if(contactId != null) {
               String[] projection1 = new String[]{ContactsContract.RawContacts._ID}; // which columns to select
                String selection = ContactsContract.Data.CONTACT_ID + " = ? AND account_type IN (?)"; // like sql WHERE  CONTACT_ID =? AND account Type = ?
                String[] selectionArgs = new String[]{contactId, "com.whatsapp"};  // ? = contactId ? = com.whatsapp
                Cursor cursor1 = contentResolver.query(ContactsContract.RawContacts.CONTENT_URI, projection1, selection, selectionArgs, null);
                if (cursor1 != null) {
                    hasWhatsApp = cursor1.moveToNext();
                    if (hasWhatsApp) {
                        rowContactId = cursor1.getString(0);
                    }
                    cursor1.close();
                }
                Log.d("Harsh has Whatsapp", String.valueOf(hasWhatsApp));
            }

        }
        callBack.invoke(null,rowContactId);

    }

}