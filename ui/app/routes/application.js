import Ember from 'ember';
import config from '../config/environment';

export default Ember.Route.extend({
  intl: Ember.inject.service(),

  beforeModel() {
    this.get('intl').setLocale('en-us');
  },

	model: function() {
    let url = config.APP.ApiUrl + 'api/stats';
    let promise=Ember.$.getJSON(url).then(function(data) {
      data.coinName=config.APP.coinName;
      data.applicationName=config.APP.projectName;
      return Ember.Object.create(data);
    });
    return promise.catch(function (error){
      console.log("Request error:"+error.statusText);
    });
	},

  setupController: function(controller, model) {
    this._super(controller, model);
    Ember.run.later(this, this.refresh, 5000);
  }
});
