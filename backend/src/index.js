import dotenv from "dotenv";
import connectDatabase from "./config/database.js";
import app from "./app.js";

dotenv.config({
    path: "./.env",
});

const startServer = async () => {
    try {
        await connectDatabase();
        console.log("Server is running...");

        app.on("error", (error) => {
            console.error("Server error:", error);
            process.exit(1);
        });

        app.listen(process.env.PORT || 3000, () => {
            console.log(
                `Server started on port ${process.env.PORT || 3000}`
            );
        });

    }
    catch (error) {
        console.error("Error starting the server:", error);
        process.exit(1);


    }

    

}

startServer();
