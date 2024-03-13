const getName = (req, res, next) => {
    // data base request or data manupulation 
    res.status(200).json({statusCode: "ok", data: "ramandeep"});

}
module.exports = {
     getName
}