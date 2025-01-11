import axios, { AxiosResponse } from "axios";
import { CreateNutrientRequest, CreateTreeRequest, CreateUserRequest, CreateUserResponse, DrivingSession, EndDrivingResponse, HelmetDetectionResponse, Nutrient, ParkingSpace, PostDrivingDataRequest, PostEndDrivingRequest, PostParkingSpaceRequest, Tree, User } from "./types";

const client = axios.create({
    baseURL: 'http://ec2-54-208-212-70.compute-1.amazonaws.com:8000/',  // Set this to your FastAPI server URL
    withCredentials: true,  // Include credentials in requests (useful for cookies or sessions)
    headers: {
        'Access-Control-Allow-Credentials': true,  // Allow credentials to be passed in cross-origin requests
    },
});

const createUser = async (data: CreateUserRequest): Promise<AxiosResponse<CreateUserResponse>> => {
    return client.post("/users", data);
};

const getUser = async (userId: string): Promise<AxiosResponse<User>> => {
    return client.get(`/users/${userId}`);
};

// Nutrients API
const postNutrient = async (data: CreateNutrientRequest): Promise<AxiosResponse<CreateNutrientRequest>> => {
    return client.post("/nutrients", data);
};

const getNutrients = async (): Promise<AxiosResponse<Nutrient[]>> => {
    return client.get("/nutrients");
};

// Trees API
const getTree = async (tree_id: number): Promise<AxiosResponse<Tree>> => {
    return client.get(`/trees/${tree_id}`);
};

const getTreesByUser = async (owner_id: number): Promise<AxiosResponse<Tree[]>> => {
    return client.get(`/trees/user/${owner_id}`);
};

const createTree = async (data: CreateTreeRequest): Promise<AxiosResponse<Tree>> => {
    return client.post("/trees", data);
};

// Driving API
const getDrivingData = async (): Promise<AxiosResponse<DrivingSession[]>> => {
    return client.get("/driving");
};

const getDrivingDataByUser = async (driver_id: number): Promise<AxiosResponse<DrivingSession[]>> => {
    return client.get(`/driving/${driver_id}`);
};

const startDriving = async (driver_id: string): Promise<AxiosResponse<EndDrivingResponse>> => {
    return client.post("/driving", {driver_id});
};

const endDriving = async (data: PostEndDrivingRequest): Promise<AxiosResponse<DrivingData>> => {
    return client.patch("/driving/end", data);
};

const postParkingSpace = async (data: PostParkingSpaceRequest): Promise<AxiosResponse<ParkingSpace>> => {
    return client.post("/parking_spaces", data);
};

// Parking Spaces API
const getParkingSpaces = async (): Promise<AxiosResponse<ParkingSpace[]>> => {
    return client.get("/parking_spaces");
};

// Helmet Detection API
const predictHelmet = async (imageData: FormData): Promise<AxiosResponse<HelmetDetectionResponse>> => {
    return client.post("/helmet_detection/predict", imageData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};


export {postNutrient, getDrivingDataByUser, startDriving, endDriving, postParkingSpace, createUser, getUser, getDrivingData, getTree, getTreesByUser, createTree, getNutrients, getParkingSpaces, predictHelmet};
  