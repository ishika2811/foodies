FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY . .

RUN chmod +x mvnw

RUN ./mvnw -f foodiesapi/pom.xml clean package -DskipTests

EXPOSE 8080

CMD ["java", "-jar", "foodiesapi/target/*.jar"]
