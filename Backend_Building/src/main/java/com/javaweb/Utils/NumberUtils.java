package com.javaweb.utils;

public class NumberUtils {
	public static boolean isNumber(String value) {
		try {
			Long number = Long.parseLong(value); 
		} catch(NumberFormatException ex) {
			return false;
		}
		return true;
	}
}
