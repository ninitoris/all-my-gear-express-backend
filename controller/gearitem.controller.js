const db = require('../db')

class GearitemController {
    async getOneGearitem(req, res) {
        const id = req.params.id
        console.log(`getting gearitem ${id}`);

        const gearitem = await db.query('SELECT * FROM gearitem WHERE gearitemid=$1', [id])
        res.json(gearitem.rows[0])
    }

    async getGearitems(req, res) {
        console.log(`getting gearitems`);
        const gearitems = await db.query('SELECT * FROM gearitem')
        res.json(gearitems.rows)
    }

    async createGearitem(req, res) {
        const {
            customname,
            category,
            brandname,
            productname,
            weightkg,
            quantity,
            userid,
            picture,
            cost,
            tempfromcelc,
            tempuptocelc,
            datepurchased,
            dateadded,
            notes
        } = req.body
        
        console.log('creating gearitem');
       
        const gearitem = await db.query(
            'INSERT INTO gearitem (Customname, Category, Brandname, Productname, WeightKG, Quantity, UserID, Picture, Cost, TempfromCELC, TempuptoCELC, Datepurchased, Dateadded, Notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING gearitemid',
            [
                customname,
                category,
                brandname,
                productname,
                weightkg,
                quantity,
                userid,
                picture,
                cost,
                tempfromcelc,
                tempuptocelc,
                datepurchased,
                dateadded,
                notes
            ]
        )
        res.json(gearitem.rows[0])
    }

    async updateGearitem(req, res) {
        const {
            customname,
            category,
            brandname,
            productname,
            weightkg,
            quantity,
            userid,
            picture,
            cost,
            tempfromcelc,
            tempuptocelc,
            datepurchased,
            dateadded,
            notes
        } = req.body
        const id = req.params.id
        
        console.log(`updating gearitem ${id}`);
       
        const gearitem = await db.query(
            'UPDATE gearitem SET customname=$2, category=$3, brandname=$4, productname=$5, weightkg=$6, quantity=$7, userid=$8, picture=$9, cost=$10, tempfromcelc=$11, tempuptocelc=$12, datepurchased=$13, dateadded=$14, notes=$15 WHERE gearitemid=$1',
            [
                id,
                customname,
                category,
                brandname,
                productname,
                weightkg,
                quantity,
                userid,
                picture,
                cost,
                tempfromcelc,
                tempuptocelc,
                datepurchased,
                dateadded,
                notes
            ]
        )
        res.json(gearitem.rows[0])
    }

    async deleteGearitem(req, res) {
        const id = req.params.id
        console.log(`deleting gearitem ${id}`);

        const gearitem = await db.query('DELETE FROM gearitem WHERE gearitemid=$1', [id])
        res.json(gearitem.rows[0])
    }

    async getGearitemsByChecklistid(req, res) {
        const checklistid = req.params.id
        console.log(`getting all gearitems in checklist ${checklistid}`);

        const gearitems = await db.query(
            'SELECT * FROM gearitem WHERE gearitemid IN (SELECT gearitemid FROM gearchecklistrelations WHERE checklistid=$1)',
            [checklistid]
        )
        res.json(gearitems.rows)
    }

    async getGearitemsByUserid(req, res) {
        const userid = req.params.id
        console.log(`getting gear for user ${userid}`);

        const gearitems = await db.query('SELECT * FROM gearitem WHERE userid=$1', [userid])
        res.json(gearitems.rows)
    }
}

module.exports = new GearitemController()
