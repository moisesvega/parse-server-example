var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Parse = require('../helpers/helper.js').Parse;

// create application/json parser
var jsonParser = bodyParser.json();

/**
 * @swagger
 * path: /publish-sdl-batch
 * operations:
 *   -  httpMethod: POST
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

router.route('/')
  .post(jsonParser, publishSdlBatch);

function publishSdlBatch(req, res){
  var body = req.body;
  // Simple syntax to create a new subclass of Parse.Object.
  var Batch = Parse.Object.extend('batches');
  var batch = new Batch();

  batch.save().then(function(data) {
      for (var publication in body) {
        if (body.hasOwnProperty(publication)) {
          var Phase = Parse.Object.extend('phases');
          var phase = new Phase();
          phase.set('publication_id', publication.pub_guid);
          phase.set('batch_id', batch);
          phase.set('phase', 'publish');
          phase.set('status', 'started');
          phase.set('publish_url', 'started');
          phase.set('orchestration_url', 'started');
          phase.set('orchestration_number', '839');
          phase.set('qa_report_link', null);
          phase.set('orchestration_name', 'sp-publish-sdl-pipeline');
          phase.set('orchestration_node', 'docker-slave-adc01kpo');
          phase.set('steps_pending', 0);
          phase.set('steps_started', 0);
          phase.set('steps_complete', 0);
          phase.save();
        }
      }
    }).then(function(data) {
      res.json(batch);
    });
};

module.exports = router;
