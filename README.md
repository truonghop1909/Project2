# Building Management System

## Overview

Building Management System is a fullstack web application designed for managing real estate properties, customers, and staff assignments. The system provides role-based access control for administrators and staff members, enabling efficient property management, customer relationship tracking, and resource allocation.

## Technology Stack

| Layer      | Technologies |
|-----------|---|
| Backend   | Java 8, Spring Boot 2.0.9, Spring Security, Spring Data JPA, Hibernate, JJWT 0.11.5, MySQL 5.7 |
| Frontend  | Next.js 16.2, React 19.2, TypeScript 6.0, TailwindCSS 4, Axios, jwt-decode |
| Database  | MySQL 5.7 |
| Deployment | Docker, Docker Compose |
| API Type  | RESTful |

## System Architecture

The application follows a three-tier architecture pattern:

```
User Interface Layer (Next.js Frontend)
         ↓
REST API Layer (Spring Boot Backend)
         ↓
Data Access Layer (Spring Data JPA)
         ↓
Database Layer (MySQL)
```

## Core Features

### Administrator Functions

- Property management with full CRUD operations
- Staff resource allocation and assignment management
- Customer request approval and rejection workflows
- User and role management
- Transaction tracking and history
- Building image storage (local or cloud-based via Cloudinary)

### Staff Functions

- View assigned properties and details
- Manage customers associated with assigned properties
- Update transaction status
- Track assigned responsibilities

### Authentication and Authorization

The system implements JWT-based authentication with role-based access control (RBAC). The authentication workflow operates as follows:

1. User submits credentials via login endpoint
2. Backend validates credentials and generates JWT token
3. Frontend stores token using secure cookie storage
4. All subsequent API requests include Authorization header: `Bearer <token>`
5. Backend validates token and checks user role permissions

Supported roles: ADMIN, STAFF

## Project Structure

```
Building/
├── Backend_Building/
│   ├── src/main/java/com/javaweb/
│   │   ├── api/               REST API controllers
│   │   ├── service/           Business logic layer
│   │   ├── repository/        JPA data access layer
│   │   ├── entity/            JPA entity models
│   │   ├── converter/         DTO conversion utilities
│   │   ├── security/          JWT and security configuration
│   │   ├── constant/          Application constants
│   │   └── utils/             Utility functions
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   ├── application-uat.properties
│   │   ├── application-pro.properties
│   │   └── application-online.properties
│   ├── pom.xml               Maven configuration
│   └── Dockerfile            Container image definition
│
├── Frontend_Building/
│   ├── src/app/              Next.js App Router pages and layouts
│   ├── src/features/         Feature-based modules
│   │   ├── auth/            Authentication module
│   │   ├── building/        Building management module
│   │   ├── customer/        Customer management module
│   │   ├── assignment/      Assignment management module
│   │   └── users/           User management module
│   ├── src/components/       Reusable UI components
│   ├── src/shared/          Shared hooks and services
│   ├── src/lib/             Utilities (JWT, Axios, Cookie)
│   ├── src/utils/           Helper functions
│   ├── package.json         NPM configuration
│   └── Dockerfile           Container image definition
│
├── docker-compose.yml       Multi-container orchestration
├── createTableBuildingDatabase.sql   Database schema
├── addDataBuildingDatabase.sql       Sample data
└── seedUsers.sql                     Initial user data
```

## Installation and Setup

### Prerequisites

- Docker and Docker Compose 1.27+
- Java 8 (for local development)
- Node.js 18+ and npm 9+ (for local frontend development)
- MySQL 5.7 (for local database development)

### Quick Start with Docker

1. Clone the repository:
```bash
git clone <repository-url>
cd Building
```

2. Start all services:
```bash
docker-compose up -d
```

3. Initialize database:
```bash
mysql -h 127.0.0.1 -P 3307 -u root -p123456 building_database < createTableBuildingDatabase.sql
mysql -h 127.0.0.1 -P 3307 -u root -p123456 building_database < addDataBuildingDatabase.sql
mysql -h 127.0.0.1 -P 3307 -u root -p123456 building_database < seedUsers.sql
```

4. Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8083
- Database: localhost:3307 (user: root, password: 123456)

### Local Development Setup

#### Backend Setup

1. Navigate to Backend_Building:
```bash
cd Backend_Building
```

2. Configure database connection in `src/main/resources/application.properties`:
```properties
server.port=8083
spring.datasource.url=jdbc:mysql://localhost:3306/building_database
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update
```

3. Build and run:
```bash
mvn clean install
mvn spring-boot:run
```

Backend will be available at http://localhost:8083

#### Frontend Setup

1. Navigate to Frontend_Building:
```bash
cd Frontend_Building
```

2. Install dependencies:
```bash
npm install
```

3. Configure API endpoint in environment variables or `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8083
```

4. Start development server:
```bash
npm run dev
```

Frontend will be available at http://localhost:3000

### Database Configuration

Default Docker credentials:
- Hostname: localhost
- Port: 3307
- Database: building_database
- Username: root
- Password: 123456

For production environments, credentials should be configured via environment variables.

## Configuration

### Backend Profiles

The application supports multiple configuration profiles:

- **uat** (default): User Acceptance Testing environment
- **pro**: Production environment
- **online**: Online production environment

Switch profiles via `SPRING_PROFILES_ACTIVE` environment variable or in application.properties.

### File Upload Configuration

- Default storage: Local filesystem at `../docker-uploads`
- Alternative: Cloudinary cloud storage
- Maximum file size: 10MB
- Supported file types: Image formats

Configure via environment variables:
```properties
STORAGE_TYPE=local|cloudinary
CLOUDINARY_CLOUD_NAME=<your-cloud-name>
CLOUDINARY_API_KEY=<your-api-key>
CLOUDINARY_API_SECRET=<your-api-secret>
```

## API Documentation

All API endpoints are accessible at `http://localhost:8083/api/`. The system uses RESTful conventions for resource operations:

- GET: Retrieve resources
- POST: Create resources
- PUT/PATCH: Update resources
- DELETE: Remove resources

Authentication is required for all endpoints except login and registration. Include JWT token in Authorization header:
```
Authorization: Bearer <jwt-token>
```

## Database Schema

The system includes three initialization scripts:

1. `createTableBuildingDatabase.sql` - Creates database tables and relationships
2. `addDataBuildingDatabase.sql` - Populates reference and master data
3. `seedUsers.sql` - Creates default user accounts for testing

## Build and Deployment

### Building Backend

```bash
cd Backend_Building
mvn clean package
```

Output: `target/spring-boot-non-jwt-1.0.jar`

### Building Frontend

```bash
cd Frontend_Building
npm run build
npm run start
```

### Docker Container Build

Both services include Dockerfile for containerization. Build images:

```bash
docker build -t building-backend ./Backend_Building
docker build -t building-frontend ./Frontend_Building
```

## Key Dependencies

### Backend Dependencies

- Spring Boot 2.0.9
- Spring Security
- Spring Data JPA
- Hibernate ORM
- JJWT 0.11.5 (JWT library)
- MySQL Connector 8.0.33

### Frontend Dependencies

- Next.js 16.2
- React 19.2
- TypeScript 6.0
- TailwindCSS 4
- Axios 1.13.2
- jwt-decode 4.0.0
- React Google Maps API 2.20.8

## Development Workflow

1. Create feature branches for new functionality
2. Ensure code follows project conventions
3. Test functionality locally before committing
4. Build and verify in Docker environment before deployment
5. Document API changes in relevant OpenAPI/Swagger documentation

## Testing

Current implementation does not include automated test suites. Consider adding:

- Unit tests for service layer
- Integration tests for API endpoints
- E2E tests for critical user workflows
- Component tests for frontend

## Security Considerations

- JWT tokens expire after 24 hours (86400000ms)
- Passwords must meet Spring Security requirements
- API endpoints are protected by role-based authorization
- Sensitive credentials should be stored as environment variables
- HTTPS should be enforced in production environments
- CORS policies should be configured for production domains

## Performance Optimization

- Database query optimization with proper indexing
- Lazy loading enabled for JPA relationships
- Pagination recommended for large datasets
- Frontend code splitting via Next.js dynamic imports
- Image optimization via Next.js Image component

## Known Limitations

- No real-time notification system (WebSocket support)
- File upload limited to local storage or Cloudinary
- No audit logging system implemented
- Limited search and filtering optimization
- Single-instance deployment only

## Future Enhancements

- Server-side pagination and advanced search functionality
- Real-time notifications via WebSocket
- Comprehensive audit logging and compliance tracking
- Enhanced file management and image optimization
- Automated testing framework implementation
- Performance monitoring and analytics
- Multi-language support
- Mobile application

## Troubleshooting

### Backend Connection Issues

Verify database connectivity:
```bash
mysql -h localhost -P 3307 -u root -p123456 -e "SELECT 1"
```

### Frontend API Connection Issues

Check backend is running and accessible at configured NEXT_PUBLIC_API_URL.

### Docker Compose Issues

Check service health:
```bash
docker-compose ps
docker-compose logs -f <service-name>
```

## Version Information

- Project Version: 1.0
- Spring Boot: 2.0.9.RELEASE
- Java: 1.8
- Node.js: 18+ (recommended)
- MySQL: 5.7

## Support and Contribution

This project is maintained as a learning initiative. For issues or suggestions, please document clearly including:

- Error messages and logs
- Steps to reproduce
- Expected vs. actual behavior
- Environment configuration details

## License

Educational project. Use and modification permitted for educational purposes only.