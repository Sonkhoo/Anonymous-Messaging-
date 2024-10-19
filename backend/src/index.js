import app from "./app.js";
import dotenv from "dotenv";
import  connectDB from "./db/index.db.js";

dotenv.config({
    path: "./.env"
});

const port = process.env.PORT || 3000;
console.log(port);
connectDB().then(() =>  {
    app.on("error", (error) => {
        console.log("Express not beig able to talk to MongoDB",error); 
        process.exit(1);
    })
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
})  
.catch((error) => {
    console.log(error);
    process.exit(1);
}
)


