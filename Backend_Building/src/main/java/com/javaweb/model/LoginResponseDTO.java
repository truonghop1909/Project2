package com.javaweb.model;

public class LoginResponseDTO {

    private String accessToken;
    private String tokenType = "Bearer";

    // Default constructor for JSON deserialization
    public LoginResponseDTO() {
    }

    public LoginResponseDTO(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }
}
