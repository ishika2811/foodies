package in.ishikag.foodiesapi.service;

import com.amazonaws.services.s3.AmazonS3;
import in.ishikag.foodiesapi.entity.FoodEntity;
import in.ishikag.foodiesapi.io.FoodRequest;
import in.ishikag.foodiesapi.io.FoodResponse;
import in.ishikag.foodiesapi.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class FoodServiceImpl implements FoodService {

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private AmazonS3 amazonS3;

    @Value("${aws.bucket.name}")
    private String bucketName;

    // ✅ Upload image to AWS S3
    @Override
    public String uploadFile(MultipartFile file) {
        try {
<<<<<<< HEAD
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
=======
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)

                    .contentType("image/png")
                    .build();
            PutObjectResponse response = s3Client.putObject(putObjectRequest, RequestBody.fromBytes(file.getBytes()));
>>>>>>> 7949972 (removed submodule and updated files)

            // upload file to S3
            amazonS3.putObject(bucketName, fileName, file.getInputStream(), null);

            // return public URL
            return amazonS3.getUrl(bucketName, fileName).toString();

        } catch (Exception e) {
            throw new RuntimeException("S3 upload failed", e);
        }
    }

    @Override
    public FoodResponse addFood(FoodRequest request, MultipartFile file) {

        FoodEntity newFoodEntity = convertToEntity(request);

        // upload image to S3
        String imageUrl = uploadFile(file);
        newFoodEntity.setImageUrl(imageUrl);

        newFoodEntity = foodRepository.save(newFoodEntity);

        return convertToResponse(newFoodEntity);
    }

    @Override
    public List<FoodResponse> readFoods() {
        List<FoodEntity> databaseEntries = foodRepository.findAll();

        return databaseEntries.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public FoodResponse readFood(String id) {
        FoodEntity existingFood = foodRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food not found for id: " + id));

        return convertToResponse(existingFood);
    }

    @Override
    public boolean deleteFile(String fileName) {
        try {
            if (amazonS3.doesObjectExist(bucketName, fileName)) {
                amazonS3.deleteObject(bucketName, fileName);
                return true;
            }
            return false;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public void deleteFood(String id) {
        FoodResponse response = readFood(id);

        // delete image from S3
        if (response.getImageUrl() != null) {
            String fileName = response.getImageUrl()
                    .substring(response.getImageUrl().lastIndexOf("/") + 1);

            deleteFile(fileName);
        }

        // delete from DB
        foodRepository.deleteById(response.getId());
    }

    private FoodEntity convertToEntity(FoodRequest request) {
        return FoodEntity.builder()
                .name(request.getName())
                .description(request.getDescription())
                .category(request.getCategory())
                .price(request.getPrice())
                .build();
    }

    private FoodResponse convertToResponse(FoodEntity entity) {
        return FoodResponse.builder()
                .id(entity.getId())
                .name(entity.getName())
                .description(entity.getDescription())
                .category(entity.getCategory())
                .price(entity.getPrice())
                .imageUrl(entity.getImageUrl())
                .build();
    }
}
