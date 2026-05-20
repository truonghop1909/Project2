package com.javaweb.service.impl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.javaweb.service.FileStorageService;

@Service
public class FileStorageServiceImpl implements FileStorageService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    private static final Set<String> ALLOWED_EXTENSIONS =
        new HashSet<>(Arrays.asList(
                ".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp", ".svg"
        ));

    private static final Set<String> ALLOWED_CONTENT_TYPES =
        new HashSet<>(Arrays.asList(
                "image/jpeg",
                "image/png",
                "image/gif",
                "image/webp",
                "image/bmp",
                "image/svg+xml"
        ));

    @Override
    public String storeFile(MultipartFile file) {
        try {
            if (file == null || file.isEmpty()) {
                throw new RuntimeException("File rỗng");
            }

            String originalFilename = file.getOriginalFilename();
            String extension = "";

            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf(".")).toLowerCase();
            }

            String contentType = file.getContentType();

            if (contentType == null || !ALLOWED_CONTENT_TYPES.contains(contentType.toLowerCase())) {
                throw new RuntimeException("Chỉ cho phép upload file ảnh hợp lệ");
            }

            if (!ALLOWED_EXTENSIONS.contains(extension)) {
                throw new RuntimeException("Chỉ cho phép các định dạng: jpg, jpeg, png, gif, webp, bmp, svg");
            }

            System.out.println("Upload dir: " + uploadDir);

            String newFileName = UUID.randomUUID().toString() + extension;

            Path uploadPath = Paths.get(uploadDir);
            Files.createDirectories(uploadPath);

            System.out.println("Upload dir (relative): " + uploadDir);
            System.out.println("Upload dir (absolute): " + uploadPath.toAbsolutePath());

            Path filePath = uploadPath.resolve(newFileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            System.out.println("Saved file at: " + filePath.toAbsolutePath());

            return newFileName;

        } catch (IOException e) {
            throw new RuntimeException("Không lưu được file", e);
        }
    }
}