FROM openjdk:17

WORKDIR /app

COPY . .

WORKDIR /app/foodiesapi

RUN ../mvnw clean package -DskipTests

EXPOSE 8080

CMD ["java", "-jar", "target/*.jar"]
