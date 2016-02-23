var express = require('express');
var router = express.Router();
var Parse = require('../helpers/helper.js').Parse;

/**
 * @swagger
 * resourcePath: /status
 * description: All about API
 */

/**
 * @swagger
 * path: /status
 * operations:
 *   -  httpMethod: GET
 *      summary: Login with username and password
 *      notes: Returns a user based on username
 *      responseClass: User
 *      nickname: login
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name: username
 *          description: Your username
 *          paramType: query
 *          required: true
 *          dataType: string
 *        - name: password
 *          description: Your password
 *          paramType: query
 *          required: true
 *          dataType: string
 */

router.route('/batches/:batch_id/phases')
  .get(getPhasesByBatchId);

function getPhasesByBatchId(req,res) {
  var batchId = req.params.batch_id;
  var Batch = Parse.Object.extend('batches');
  var query = new Parse.Query(Batch);

  query.get(batchId, {
    success: function(batch) {
      var Phase = Parse.Object.extend('phases');
      var query = new Parse.Query(Phase);

      query.equalTo('batch_id', batch);
      query.find(function(phases) {
        var response = {};
        response.results = phases;
        res.json(response);
      });
    },
    error: function(object, error) {
      if (error.code === Parse.Error.OBJECT_NOT_FOUND) {
        res.status(404).json(error);
      } else if (error.code === Parse.Error.CONNECTION_FAILED) {
        res.status(500).json(error);
      }
    }
  });
}

module.exports = router;
