module.exports = {
    dragonTreasure: async (req, res) => {
        const db = req.app.get('db')
        let dTreasure = await db.get_dragon_treasure(1)
        return res.status(200).send(dTreasure)
    },
    getUserTreasure: async (req,res) => {
        const db = req.app.get('db')
        let uTreasure = await db.get_user_treasure([req.session.user.id])
        return res.status(200).send(uTreasure)
    },
    addUserTreasure: async (req, res) => {
        let {treasureURL} = req.body
        let {id} = req.session.user
        const db = req.app.get('db')
        let userTreasure = await db.add_user_treasure([treasureURL, id])
        return res.status(200).send(userTreasure)
    },
    getAllTreasure: async (req, res) => {
        const db = req.app.get('db')
        let allTreasure = await db.get_all_treasure()
        return res.status(200).send(allTreasure)
    }
    
}