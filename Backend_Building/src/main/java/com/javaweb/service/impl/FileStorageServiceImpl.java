package com.javaweb.service.impl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.javaweb.service.FileStorageService;

@Service
public class FileStorageServiceImpl implements FileStorageService {

    @Value("${storage.type:local}")  // mặc định là local nếu không có
    private String storageType;

    @Value("${file.upload-dir:uploads}")
    private String uploadDir;

    private static final Set<String> ALLOWED_EXTENSIONS = new HashSet<>(Arrays.asList(
        ".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp", ".svg"
    ));

    private static final Set<String> ALLOWED_CONTENT_TYPES = new HashSet<>(Arrays.asList(
        "image/jpeg", "image/png", "image/gif", "image/webp", "image/bmp", "image/svg+xml"
    ));

    @Autowired(required = false)  // cho phép không có Cloudinary nếu dùng local
    private Cloudinary cloudinary;

    @Override
    public String storeFile(MultipartFile file) {
        // Kiểm tra file rỗng và định dạng (giữ nguyên)
        validateFile(file);
        
        if ("cloudinary".equalsIgnoreCase(storageType)) {
            return storeToCloudinary(file);
        } else {
            return storeToLocal(file);
        }
    }

    private String storeToLocal(MultipartFile file) {
        try {
            String originalFilename = file.getOriginalFilename();
            String extension = "";
            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf(".")).toLowerCase();
            }
            String newFileName = UUID.randomUUID().toString() + extension;

            Path uploadPath = Paths.get(uploadDir);
            Files.createDirectories(uploadPath);

            Path filePath = uploadPath.resolve(newFileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            System.out.println("Saved locally: " + filePath.toAbsolutePath());
            return newFileName;  // hoặc trả về đường dẫn tương đối
        } catch (IOException e) {
            throw new RuntimeException("Lỗi lưu file local", e);
        }
    }

    private String storeToCloudinary(MultipartFile file) {
        try {
            if (cloudinary == null) {
                throw new RuntimeException("Cloudinary chưa được cấu hình. Vui lòng kiểm tra dependencies và cấu hình.");
            }
            String publicId = UUID.randomUUID().toString();
            Map<?, ?> uploadResult = cloudinary.uploader().upload(
                file.getBytes(),
                ObjectUtils.asMap("public_id", publicId, "folder", "uploads")
            );
            String imageUrl = (String) uploadResult.get("secure_url");
            System.out.println("Uploaded to Cloudinary: " + imageUrl);
            return imageUrl;
        } catch (IOException e) {
            throw new RuntimeException("Lỗi upload lên Cloudinary", e);
        }
    }

    private void validateFile(MultipartFile file) {
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
    }
}