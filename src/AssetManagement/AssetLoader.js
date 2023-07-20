/**
 *
 */

export class AssetLoader
{
    constructor() {
        if(this.constructor == AssetLoader)
        {
            throw new Error("An instance of class AssetLoader can't be created, try a base class instead");
        }
    }

    load()
    {
        throw new Error("Load cannot be called on the AssetLoader class, method must be implemented in a derived class");
    }

    unload()
    {
        throw new Error("Unload cannot be called on the AssetLoader class, method must be implemented in a derived class");
    }
}