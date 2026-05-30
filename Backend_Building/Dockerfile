# Stage 1: Build (dùng Maven với Temurin JDK 8)
FROM maven:3.8-eclipse-temurin-8 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run (dùng Temurin JRE 8)
FROM eclipse-temurin:8-jre
WORKDIR /app
COPY --from=build /app/target/spring-boot-non-jwt-1.0.jar app.jar
EXPOSE 8083
ENTRYPOINT ["java", "-jar", "app.jar"]