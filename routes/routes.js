const Router = require('express')
const router = new Router()
const checklistController = require('../controller/checklist.controller')
const gearitemController = require('../controller/gearitem.controller')

router.post('/newchecklist', checklistController.createChecklist)
router.get('/checklists', checklistController.getChecklists)
router.get('/checklist/:id', checklistController.getOneChecklist)
router.put('/checklist/:id', checklistController.updateChecklist)
router.delete('/checklist/:id', checklistController.deleteChecklist)


router.get('/gearitem/:id', gearitemController.getOneGearitem)
router.get('/gearitems', gearitemController.getGearitems)
router.post('/gearitem', gearitemController.createGearitem)
router.put('/gearitem/:id', gearitemController.updateGearitem)
router.delete('/gearitem/:id', gearitemController.deleteGearitem)

router.get('/checklist/:id/gearitems', gearitemController.getGearitemsByChecklistid)
router.get('/user/:id/gearitems', gearitemController.getGearitemsByUserid)
router.get('/user/:id/checklists', checklistController.getChecklistsByUserid)

/*
router.HandleFunc("/api/user/{id}", middleware.GetUser).Methods("GET", "OPTIONS")
router.HandleFunc("/api/user", middleware.GetAllUser).Methods("GET", "OPTIONS")
router.HandleFunc("/api/newuser", middleware.CreateUser).Methods("POST", "OPTIONS")
router.HandleFunc("/api/user/{id}", middleware.UpdateUser).Methods("PUT", "OPTIONS")
router.HandleFunc("/api/deleteuser/{id}", middleware.DeleteUser).Methods("DELETE", "OPTIONS")

router.HandleFunc("/api/gearcheckrelations", middleware.GetAllGearCheckRelations).Methods("GET", "OPTIONS")
router.HandleFunc("/api/gearcheckrelations/{id}", middleware.GetRelationsByChecklistID).Methods("GET", "OPTIONS")

*/

module.exports = router