# Stage 1: Build using Maven with JDK 8
FROM maven:3.8-openjdk-8 AS build
WORKDIR /app
# Copy pom.xml and source code
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
# Build the JAR file (skip tests to speed up)
RUN mvn clean package -DskipTests

# Stage 2: Run using JRE 8
FROM openjdk:8-jre-slim
WORKDIR /app
# Copy the built JAR from build stage
COPY --from=build /app/target/spring-boot-non-jwt-1.0.jar app.jar
# Expose the port your app runs on (from application properties: 8083)
EXPOSE 8083
# Run the JAR, allowing environment variables to override
ENTRYPOINT ["java", "-jar", "app.jar"]