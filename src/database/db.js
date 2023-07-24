import { connect } from "mongoose";

export const conn = async () => {
    try{
        await connect(`mongodb://localhost:27018/hospital`);
        console.log(`Connected to Database`);
    }catch(err){
        console.error(`Error: ${err}`);
    }
};