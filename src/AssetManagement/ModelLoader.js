
import {AssetLoader} from "./AssetLoader.js";
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";

export class ModelLoader extends AssetLoader
{
    gltfLoader = null;

    constructor() {
        super();
        console.log("constructing a loader");

        this.gltfLoader = new GLTFLoader();
    }

    load( assetPath, assetID, callback) {
        // ToDo: Implement loading logic

        this.gltfLoader.load(assetPath, function(gltf)
        {
            console.log("Loading model: XXX");
            // ToDo: review what's needed to return
            callback(gltf.scene);
        }, undefined, function(error)
        {
            console.error(error);
            callback(null);
        });
    }

    unload() {
        console.log("Unloading model: XXX");
    }
}