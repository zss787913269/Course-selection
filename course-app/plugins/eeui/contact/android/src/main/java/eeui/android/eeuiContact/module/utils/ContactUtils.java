package eeui.android.eeuiContact.module.utils;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.Context;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.provider.ContactsContract;
import android.util.Log;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.taobao.weex.bridge.JSCallback;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import app.eeui.framework.extend.integration.xutils.common.util.FileUtil;
import app.eeui.framework.extend.module.eeuiCommon;
import app.eeui.framework.extend.module.eeuiJson;
import app.eeui.framework.extend.module.utilcode.util.PermissionUtils;

public class ContactUtils {

    @SuppressLint("WrongConstant")
    public static void get(final boolean getSection, final Context context, final JSCallback callback) {
        PermissionUtils.permission(Manifest.permission.READ_CONTACTS, Manifest.permission.READ_PHONE_STATE).rationale(new PermissionUtils.OnRationaleListener() {
            @Override
            public void rationale(ShouldRequest shouldRequest) {
                PermissionUtils.showRationaleDialog(context, shouldRequest, "联系人");
            }
        }).callback(new PermissionUtils.FullCallback() {
            @Override
            public void onGranted(List<String> permissionsGranted) {
                PermissionUtils.permission(Manifest.permission.WRITE_EXTERNAL_STORAGE).rationale(new PermissionUtils.OnRationaleListener() {
                    @Override
                    public void rationale(ShouldRequest shouldRequest) {
                        PermissionUtils.showRationaleDialog(context, shouldRequest, "存储");
                    }
                }).callback(new PermissionUtils.FullCallback() {
                    @Override
                    public void onGranted(List<String> permissionsGranted) {
                        JSONObject data = new JSONObject();
                        data.put("status", "success");
                        if (getSection) {
                            data.put("section", toSection(ContactUtils.getAllContacts(context)));
                        } else {
                            data.put("lists", ContactUtils.getAllContacts(context));
                        }
                        callback.invoke(data);
                    }

                    @Override
                    public void onDenied(List<String> permissionsDeniedForever, List<String> permissionsDenied) {
                        if (!permissionsDeniedForever.isEmpty()) {
                            JSONObject data = new JSONObject();
                            data.put("status", "success");
                            if (getSection) {
                                data.put("section", toSection(ContactUtils.getAllContacts(context)));
                            } else {
                                data.put("lists", ContactUtils.getAllContacts(context));
                            }
                            callback.invoke(data);
                        }
                    }
                }).request();
            }

            @Override
            public void onDenied(List<String> permissionsDeniedForever, List<String> permissionsDenied) {
                if (!permissionsDeniedForever.isEmpty()) {
                    PermissionUtils.showOpenAppSettingDialog(context, "联系人");
                    JSONObject data = new JSONObject();
                    data.put("status", "error");
                    data.put("error", "没有访问通讯录相关权限");
                    callback.invoke(data);
                }
            }
        }).request();
    }

    /**
     * 根据字母排序
     * @param contacts
     * @return
     */
    private static JSONArray toSection(JSONArray contacts) {
        Map<String, JSONArray> array = new HashMap<>();
        for (int i = 0; i < contacts.size(); i++) {
            JSONObject item = contacts.getJSONObject(i);
            String py = ChineseCharToEn.getInstance().getFirstLetter(eeuiJson.getString(item, "name")).toUpperCase();
            JSONArray tmp = array.get(py);
            if (tmp == null) {
                tmp = new JSONArray();
            }
            tmp.add(item);
            array.put(py, tmp);
        }
        JSONArray section = new JSONArray();
        for (String key : array.keySet()) {
            JSONObject data = new JSONObject();
            data.put("key", key);
            data.put("lists", array.get(key));
            section.add(data);
        }
        return section;
    }

    /**
     * 获取联系人
     *
     * @param context
     * @return
     */
    private static JSONArray getAllContacts(Context context) {
        JSONArray lists = new JSONArray();
        Cursor cursor = context.getContentResolver().query(ContactsContract.Contacts.CONTENT_URI, null, null, null, null);
        if (cursor == null) {
            return lists;
        }
        File photoDir = FileUtil.getCacheDir("contactsPhoto");
        while (cursor.moveToNext()) {
            //新建一个联系人实例
            JSONObject temp = new JSONObject();
            String contactId = cursor.getString(cursor.getColumnIndex(ContactsContract.Contacts._ID));
            //获取联系人姓名
            temp.put("name", cursor.getString(cursor.getColumnIndex(ContactsContract.Contacts.DISPLAY_NAME)));
            //获取联系人电话号码
            Cursor phoneCursor = context.getContentResolver().query(ContactsContract.CommonDataKinds.Phone.CONTENT_URI, null, ContactsContract.CommonDataKinds.Phone.CONTACT_ID + "=" + contactId, null, null);
            JSONArray phones = new JSONArray();
            if (phoneCursor != null) {
                while (phoneCursor.moveToNext()) {
                    String phone = phoneCursor.getString(phoneCursor.getColumnIndex(ContactsContract.CommonDataKinds.Phone.NUMBER));
                    phone = phone.replace("-", "");
                    phone = phone.replace(" ", "");
                    phones.add(phone);
                }
                phoneCursor.close();
            }
            temp.put("phones", phones);
            //获取联系人头像
            Bitmap photo = getContactPhoto(context, contactId);
            temp.put("photo", photo == null ? "" : imageToGallery(photo, eeuiCommon.md5(temp.getString("name")), photoDir));
            //
            lists.add(temp);
        }
        cursor.close();
        return lists;
    }

    /**
     * 获取手机联系人头像
     *
     * @param c
     * @param personId
     * @return
     */
    private static Bitmap getContactPhoto(Context c, String personId) {
        byte[] data = new byte[0];
        Uri u = Uri.parse("content://com.android.contacts/data");
        String where = "raw_contact_id = " + personId + " AND mimetype ='vnd.android.cursor.item/photo'";
        Cursor cursor = c.getContentResolver().query(u, null, where, null, null);
        if (cursor != null) {
            if (cursor.moveToFirst()) {
                data = cursor.getBlob(cursor.getColumnIndex("data15"));
            }
            cursor.close();
        }
        if (data == null || data.length == 0) {
            return null;
        } else {
            return BitmapFactory.decodeByteArray(data, 0, data.length);
        }
    }

    private static String imageToGallery(Bitmap bmp, String fileName, File appDir) {
        if (appDir == null) {
            appDir = FileUtil.getCacheDir("image");
        }
        if (fileName == null) {
            fileName = System.currentTimeMillis() + ".jpg";
        }
        if (appDir != null && (appDir.exists() || appDir.mkdirs())) {
            // 保存图片
            File currentFile = new File(appDir, fileName);
            if (currentFile.exists()) {
                return currentFile.getPath();
            }
            FileOutputStream fos = null;
            try {
                fos = new FileOutputStream(currentFile);
                bmp.compress(Bitmap.CompressFormat.JPEG, 100, fos);
                fos.flush();
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                try {
                    if (fos != null) {
                        fos.close();
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            //
            if (currentFile.exists()) {
                return currentFile.getPath();
            }
        }
        return null;
    }
}
