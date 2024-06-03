
const db = require("../models");
const Assets = db.Assets;

exports.getAllAssets = async (req, res) => {
    try {
        const userId = req.userId; // Retrieved from the token after verification

        let whereClause = {
            user_id: userId // Ensure that only the finances related to the logged-in user are fetched
        };

        const assets = await Assets.findAll({
            where: { ...whereClause }
        });

        res.status(200).json(assets);
    } catch (error) {
        res.status(500).send({
            message: "Error retrieving assets: " + error.message
        });
    }
};

exports.createAsset = async (req, res) => {
    const userId = req.userId; // Retrieved from the token after verification
    const { type, value, description } = req.body;

    // Ensure all required fields are provided
    if (!type || !value || description === undefined) {
        return res.status(400).send({
            message: "All fields (type, value, description) are required."
        });
    }

    try {
        const newAsset = await Assets.create({
            user_id: userId,
            type: type,
            value: value,
            description: description
        });

        res.status(201).json(newAsset);
    } catch (error) {
        res.status(500).send({
            message: "Error creating new asset: " + error.message
        });
    }
};



exports.updateAsset = async (req, res) => {
    const assetId = req.params.assetId;
    const userId = req.userId; // Retrieved from the token after verification

    try {
        const [updated] = await Assets.update(req.body, {
            where: { id: assetId, user_id: userId }
        });
        if (updated) {
            const updatedAsset = await Assets.findByPk(assetId);
            res.status(200).json(updatedAsset);
        } else {
            res.status(404).send({
                message: `Cannot update asset with id=${assetId}. Maybe asset was not found or req.body is empty!`
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "Error updating asset with id=" + assetId
        });
    }
};


exports.deleteAsset = async (req, res) => {
    const assetId = req.params.assetId;
    const userId = req.userId; // Retrieved from the token after verification
    
    try {
        const deleted = await Assets.destroy({
            where: { id: assetId,  user_id: userId }
        });
        if (deleted) {
            res.status(200).send({
                message: "Asset was deleted successfully!"
            });
        } else {
            res.status(404).send({
                message: `Cannot delete asset with id=${assetId}. Maybe asset was not found!`
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "Could not delete asset with id=" + assetId
        });
    }
};
