# Wanderlust

Wanderlust is a web application that allows users to discover, list, and review unique places to stay around the world. It is inspired by Airbnb and provides a platform for users to find everything from cozy rooms to entire castles.

## Live Demo

You can view a live demo of the website here: [https://wanderlust-a1m5.onrender.com/listings](https://wanderlust-a1m5.onrender.com/listings)

## Features

* **User Authentication:** Users can sign up and log in to their accounts.
* **Create Listings:** Authenticated users can create new listings with details such as title, description, price, location, and an image.
* **View Listings:** Users can browse through a variety of listings, view details of each listing, and see them on a map.
* **Edit and Delete Listings:** Users can edit or delete the listings they own.
* **Reviews and Ratings:** Users can leave reviews and ratings for listings.
* **Interactive Maps:** Listings are displayed on an interactive map using Mapbox GL JS, showing the location of each property.

## Technologies Used

* **Frontend:**
    * EJS
    * Bootstrap
    * CSS
    * Mapbox GL JS

* **Backend:**
    * Node.js
    * Express.js
    * MongoDB
    * Mongoose
    * Passport.js for authentication
    * Cloudinary for image storage

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/pankj-ctrl/wanderlust.git
    ```
2.  **Install dependencies:**
    ```bash
    npm install --force
    ```
3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add the following:
    ```
    ATLASDB_URL=<your_mongodb_connection_string>
    SECRET=<your_session_secret>
    MAP_TOKEN=<your_mapbox_token>
    CLOUD_NAME=<your_cloudinary_cloud_name>
    CLOUD_API_KEY=<your_cloudinary_api_key>
    CLOUD_API_SECRET=<your_cloudinary_api_secret>
    ```
4.  **Start the server:**
    ```bash
    node app.js
    ```
    The application will be running on `http://localhost:8080`.