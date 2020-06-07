package eeui.android.eeuiContact.module;

import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.bridge.JSCallback;

import app.eeui.framework.extend.base.WXModuleBase;
import eeui.android.eeuiContact.module.utils.ContactUtils;

public class eeuiContactAppModule extends WXModuleBase {

    /**
     * 获取联系人列表
     *
     * @param callback
     */
    @JSMethod
    public void lists(JSCallback callback) {
        ContactUtils.get(false, getContext(), callback);
    }

    /**
     * 获取联系人列表（分组）
     *
     * @param callback
     */
    @JSMethod
    public void section(JSCallback callback) {
        ContactUtils.get(true, getContext(), callback);
    }
}
