# ShelfMaster Library Management System with JWT Authentication

This is a complete Library Management System built with Spring Boot (backend) and React (frontend) featuring JWT authentication, CRUD operations for books and members, comprehensive testing, and Redis caching.

## 🚀 Features

### Backend Features
- **JWT Authentication**: Secure user authentication with JSON Web Tokens
- **Spring Security**: Role-based access control (for ADMIN)
- **CRUD Operations**: Complete Create, Read, Update, Delete operations for:
  - Books management
  - Members management
- **Redis Caching**: Improved performance with Redis caching for books
- **Comprehensive Testing**: Unit tests with high coverage
- **RESTful API**: Well-structured REST endpoints
- **Database Support**: MySQL for production, H2 for testing

### Frontend Features
- **React Application**: Modern React-based user interface
- **Authentication Integration**: JWT token management with automatic renewal
- **Books Management**: Complete interface for book operations
- **Members Management**: User-friendly member management
- **Responsive Design**: Clean, modern UI using Ant Design components
- **Error Handling**: Proper error handling and user feedback

## 🛠 Technology Stack

### Backend
- **Spring Boot 3.5.4**
- **Spring Security** (JWT Authentication)
- **Spring Data JPA** (Database operations)
- **MySQL** (Production database)
- **H2** (Test database)
- **Redis** (Caching layer)
- **JUnit 5** (Testing framework)
- **Mockito** (Mocking for tests)
- **Maven** (Dependency management)

### Frontend
- **React 18**
- **Axios** (API communication)
- **Ant Design** (UI components)
- **Chart.js** (Data visualization)

## 📁 Project Structure

```
LibraryManagementSystem/
├── backend/
│   ├── src/main/java/com/example/LibraryManagementSystem/
│   │   ├── config/           # Security and Redis configuration
│   │   ├── controller/       # REST controllers
│   │   ├── dto/             # Data Transfer Objects
│   │   ├── entity/          # JPA entities
│   │   ├── repo/            # Repository interfaces
│   │   ├── security/        # JWT security components
│   │   ├── service/         # Business logic
│   │   └── util/            # Utility classes
│   ├── src/test/java/       # Test classes
│   └── pom.xml             # Maven dependencies
├── frontend/frontend/
│   ├── src/
│   │   ├── API/            # API integration
│   │   ├── Pages/          # React pages
│   │   ├── components/     # Reusable components
│   │   └── services/       # Authentication services
│   └── package.json        # npm dependencies
└── README.md              # This file
```

## 🔐 Authentication System

The system implements a complete JWT authentication system:

### User Roles
- **ADMIN**: Full system access

### Security Features
- Password encryption using BCrypt
- JWT token generation and validation
- Automatic token refresh on API calls
- Logout functionality with token invalidation
- Role-based access control

### API Endpoints

#### Authentication Endpoints
```
POST /api/v1/auth/signin     # User login
POST /api/v1/auth/signup     # User registration
GET  /api/v1/auth/profile    # Get user profile
```

#### Books Endpoints (Requires Authentication)
```
GET    /api/v1/books/getAllBooks        # Get all books
GET    /api/v1/books/searchBooks/{id}   # Get book by ID
POST   /api/v1/books/saveBooks          # Create new book
PUT    /api/v1/books/updateBooks        # Update existing book
DELETE /api/v1/books/deleteBooks/{id}   # Delete book
```

#### Members Endpoints (Requires Authentication)
```
GET    /api/v1/members/getAllMembers         # Get all members
GET    /api/v1/members/GetMembersByID/{id}   # Get member by ID
POST   /api/v1/members/add                   # Create new member
PUT    /api/v1/members/update/{id}           # Update existing member
DELETE /api/v1/members/delete/{id}           # Delete member
```

## 🧪 Testing Strategy

The project includes comprehensive testing:

### Unit Tests
- **Service Layer Tests**: Complete coverage of business logic
- **Repository Tests**: Database operations testing
- **Utility Tests**: JWT utilities and helper functions

### Test Coverage
- Books Service: 11 test methods covering all CRUD operations
- Authentication: Complete auth flow testing
- JWT Utils: Token generation, validation, and parsing tests

## 🚦 Getting Started

### Prerequisites
- Java 17+
- Node.js 14+
- MySQL 8.0+
- Redis server
- Maven 3.6+

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/IsuruIndrajith/Library-Management-System-Spring-boot-.git
   cd LibraryManagementSystem/backend
   ```

2. **Configure Database**
   Update `application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/LibraryMS?createDatabaseIfNotExist=true
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

3. **Start Redis Server**
   ```bash
   redis-server
   ```

4. **Run the Application**
   ```bash
   mvn spring-boot:run
   ```

5. **Run Tests**
   ```bash
   mvn test
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../frontend/frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm start
   ```

The frontend will be available at `http://localhost:3000`

## 📊 API Testing Examples

### 1. User Registration
```bash
curl -X POST http://localhost:8080/api/v1/auth/signup \
-H "Content-Type: application/json" \
-d '{
  "username": "Admin01",
  "email": "admin01@example.com",
  "password": "password123"
}'
```

### 2. User Login
```bash
curl -X POST http://localhost:8080/api/v1/auth/signin \
-H "Content-Type: application/json" \
-d '{
  "username": "Admin01",
  "password": "password123"
}'
```

### 3. Get All Books (with JWT token)
```bash
curl -X GET http://localhost:8080/api/v1/books/getAllBooks \
-H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 4. Add New Book
```bash
curl -X POST http://localhost:8080/api/v1/books/saveBooks \
-H "Authorization: Bearer YOUR_JWT_TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "isbn": "9780132350884",
  "publisher": "Prentice Hall",
  "yearPublished": 2008,
  "genre": "Programming",
  "copiesTotal": 8,
  "copiesAvailable": 8
}'
```

## 🔧 Configuration

### JWT Configuration
```properties
# JWT secret key (should be changed in production)
jwt.secret=LibraryManagementSystemSecretKeyForJWTAuthenticationAndAuthorization2024
# JWT expiration time (24 hours)
jwt.expiration=86400000
```

### Redis Configuration
```properties
spring.data.redis.host=localhost
spring.data.redis.port=6379
spring.cache.type=redis
```

## 🚀 Deployment

### Production Checklist
1. Change JWT secret key
2. Configure production database
3. Set up Redis cluster
4. Configure CORS properly
5. Set up HTTPS
6. Configure logging levels
7. Set up monitoring

### Docker Deployment for Redis implementation
The project includes `compose.yml` for easy Docker deployment:
```bash
docker-compose up -d
```

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Issues**
   - Verify MySQL is running
   - Check database credentials
   - Ensure database exists

2. **Redis Connection Issues**
   - Verify Redis server is running
   - Check Redis configuration

3. **JWT Token Issues**
   - Check token expiration
   - Verify JWT secret configuration
   - Ensure proper Authorization header format

4. **Frontend API Issues**
   - Check CORS configuration
   - Verify backend is running
   - Check API endpoint URLs

## 📈 Performance Features

- **Redis Caching**: Books data is cached for improved performance
- **Connection Pooling**: HikariCP for database connections
- **Lazy Loading**: JPA lazy loading for related entities
- **Pagination**: Built-in pagination for large datasets

## 🔒 Security Features

- **Password Encryption**: BCrypt password encoding
- **JWT Security**: Stateless authentication
- **CORS Protection**: Configurable CORS settings
- **Input Validation**: Request validation and sanitization
- **Role-based Access**: Fine-grained permission control

## 📚 Testing Commands

```bash
# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=booksServiceTest

# Run tests with coverage
mvn test jacoco:report

# Run integration tests only
mvn test -Dtest=*ControllerTest
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Created by isuru indrajith - Full Stack Developer

---

**Note**: This is a demonstration project showcasing modern web development practices with Spring Boot, React, JWT authentication, comprehensive testing, and performance optimization.
