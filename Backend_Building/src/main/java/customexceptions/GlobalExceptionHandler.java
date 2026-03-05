package customexceptions;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BuildingAssignedException.class)
    public ResponseEntity<?> handleBuildingAssigned(BuildingAssignedException ex) {

        Map<String, Object> response = new HashMap<>();
        response.put("message", ex.getMessage());
        response.put("error", "BUSINESS_ERROR");

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}
