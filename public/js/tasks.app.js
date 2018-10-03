var tasksApp = new Vue({
  el: '#taskMain',
  data: {
    task: {
      id: 0,
      title: 'foo',
      type : '',
      size : '',
      team : '',
      status: '',
      start_date: '',
      close_date: null,
      hours_worked: '',
      perc_complete: '',
      current_sprint : ''
    },
    work: [ ],
    workForm: { },   // populated by this.getEmptyWorkForm()
    teamList: [] // All the teams
  },
  computed: {
    workSpan () {
      return moment(this.workForm.stop + ' ' + this.workForm.stop_time)
             .diff(moment(this.workForm.start), 'hours', true)
             .toFixed(1);
    }
  },
  methods: {
    handleWorkForm(e) {
      // TODO: Check validity
      if (this.computed <= 0) {
        console.error("invalid form")
      }
      this.workForm.task_id = this.taskId;
      this.workForm.hours = this.workSpan;
      this.workForm.strat_date = this.workForm.start + ' ' + this.workForm.start_time;

      const s = JSON.stringify(this.workForm);
      console.log(s);

      //TODO: POST to remote server
      fethc('api/work.php', {
        method: "POST", //*GET, POST, DELETE, PUT, ETC
        headers: {
          "Content-Type": "application/json; charset+utf-8"
        },
        body: s //body data type must match "cotent-Type" header
      })
      //TODO: Append result
      this.work.push(JSON.parse(s));

      // Reset workForm
      this.workForm = this.getEmptyWorkForm();
    },
    sumHours() {
      return this.work.reduce( (sum, current) => sum + current.hours, 0 )
    },
    diffAsHours() {
      return 0; //moment().duration(end.diff(startTime)).asHours();
    },
    dateFormat(d) {
      d = d || moment();
      return moment(d).format('YYYY-MM-DD[T]HH:MM');
    },
    getEmptyWorkForm() {
      return {
        start: this.dateFormat(),
        start_time: this.timeFormat(),
        stop: this.dateFormat(),
        stop_time: this.timeFormat(),
        teamList: null,
        completion_estimate: 0
      }
    },
    prettyDate(d) {
      return moment(d).format('YYYY-MM-DD HH:MM')
    }
  },
  created () {
    // Populate workForm with default values
    this.workForm = this.getEmptyWorkForm();

    // Do data fetch
    const url = new URL(window.location.href);
    const taskId = url.searchParams.get('taskId');
    console.log('Task: '+ taskId);
    this.taskId = taskId

    if (!taskId) {
      //TODO: Error? 404?
      //e.g., window.location = '404.html';
    }

    // TODO: Fetch task-specific data
    // fetch('api/task?id=4')
    fetch('api/work.php?taskId='+ taskId)
    .then( response => response.json() )
    .then( json => {tasksApp.work = json} )
    .catch( err => {
      console.log('WORK FETCH ERROR:');
      console.log(err);
    })

    fetch('api/team.php')
    .then( response => response.json() )
    .then( json => {tasksApp.teamList = json} )
    .catch( err => {
      console.log('TEAM LIST ERROR:');
      console.log(err);
    })
  }
})
