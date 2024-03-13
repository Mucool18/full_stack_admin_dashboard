const OverallStat = require("../models/overallStat");

const getSales = async (req, res) => {
        try {
            const overallStats = await OverallStat.find({});
            res.status(200).json({success: true, message:"Stats found successfully", data: overallStats[0]})
        } catch (error) {
            res.status(404).json({success: false, message:"No Stat found"})
        }
    
    
}

module.exports = {
    getSales
}