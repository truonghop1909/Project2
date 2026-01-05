package com.javaweb.Utils;

import java.util.Map;

public class MapUtil {

    @SuppressWarnings("unchecked")
    public static <T> T getObject(
            Map<String, Object> params,
            String key,
            Class<T> tClass) {

        Object rawValue = params.get(key);

        if (rawValue == null) {
            return null;
        }

        String value = rawValue.toString().trim();
        if (value.isEmpty()) {
            return null;
        }

        try {
            if (tClass == String.class) {
                return (T) value;
            }
            if (tClass == Integer.class) {
                return (T) Integer.valueOf(value);
            }
            if (tClass == Long.class) {
                return (T) Long.valueOf(value);
            }
            if (tClass == Double.class) {
                return (T) Double.valueOf(value);
            }
        } catch (Exception e) {
            // parse lỗi thì coi như không có param
            return null;
        }

        return null;
    }
}
