$(document).ready(function () {

    $('.selectProfile').select2({
        width: '100%',
        placeholder: "Who's Profile Would You Like To See",
        minimumResultsForSearch: Infinity,
    }).on('change', function (e) {        
        var obj = $(this).select2('data')[0];  
        vm_interview.searchInterviews(obj.text.trim());
    })
})

document.onreadystatechange = function () {

        // setColours();        
        $(".loadingSpinner").fadeOut(50);
    }


vm_interview = new Vue({

    el: '.interview',
    data: {
        allInterviews: [],
        currentInterview: [],
        pName: qs("pname"),
        names: []
    },

    created: function () {
        this.getInterviews()
    },

    methods: {

        getInterviews: function () {        

            var vm = this;
            var endPointUrl = siteURL + "/_api/Web/Lists/getbytitle('TwoMinuteInterview')/items"

            console.log(qs("pname"));

            axios.get(endPointUrl)
                .then(response => {

                    vm.allInterviews = [];

                    var interviews = response.data.value;
                    interviews.forEach(currInterview => {

                        var interview = [];
                        var questions = [];
                        interview["Interviewer"] = currInterview.Interviewer;
                        interview["Interviewee"] = currInterview.Title;
                        interview["FirstName"] = currInterview.Display_x0020_Name;
                        interview["BannerTitle"] = currInterview.Title + "'s Two Minute Interview";
    
                        for( i = 1; i<=14; i++){
    
                            var question = [];
    
                            question["Question"] = currInterview["Question_" +  i.toString()]
                            question["Answer"] = currInterview["Answer_" +  i.toString()]
                                                   
                            questions.push(question);                 
                        }
                        interview["questions"] = questions ;
                        vm.allInterviews.push(interview);      
                        vm.names.push(interview.Interviewee);                  
                    });

                    vm.names.sort();

                    //Get the interview to display
                    if(vm.pName != null){
                        this.searchInterviews(vm.pName)            
                    }else{
                        vm.currentInterview = vm.allInterviews.slice(0, 1)[0];
                    }

                }).catch(function (err) {
                    console.log(err);
                    vm.displayPosts = vm.noPosts;
                })
        },

        searchInterviews: function(sName) {     
            this.currentInterview = this.allInterviews.filter(function (el) {
                return el.Interviewee == sName
            })[0]    
        }        
    }
});