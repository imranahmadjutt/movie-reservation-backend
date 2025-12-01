# Movie Reservation Backend 🎬

Backend system for a **Movie Reservation Service** — allows users to sign up / log in, browse movies & showtimes, reserve seats, and manage reservations.

---

##  Features

- **User authentication**  
  - Register new users (name, email, password)  
  - Passwords hashed with bcrypt  
  - Login returns a JWT token for protected routes  

- **Movie management**  
  - Add new movies (title, description, duration)  
  - List all movies  

- **Showtime management**  
  - Add showtimes to movies  
  - List showtimes for a movie  

- **Seat reservation**  
  - Reserve seats for a specific showtime (protected route)  
  - Update available seats after reservation  
  - View reservations of logged-in user  

- **Tech stack & architecture**  
  - Node.js + Express.js  
  - PostgreSQL database  
  - Sequelize ORM for models and relations  
  - JWT-based authentication  
  - Environment variable configuration (.env)  

---

##  Getting Started

### Prerequisites

- Node.js (v18+ recommended)  
- PostgreSQL installed & running  
- Git  

### Setup

```bash
# Clone repository
git clone https://github.com/imranahmadjutt/movie-reservation-backend.git
cd movie-reservation-backend

# Install dependencies
npm install

# Create a .env file in project root with:
# DB_HOST=localhost
# DB_PORT=5432
# DB_USER=postgres
# DB_PASSWORD=your_postgres_password
# DB_NAME=movie_reservation_dev
# JWT_SECRET=some_random_secret_string
