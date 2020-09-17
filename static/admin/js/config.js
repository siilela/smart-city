
$(function(){
    $(document).on("click",'.player .p0',function(){
        toggleConfigMSG("show")
    })

    $(document).on("click",'.player .p1',function(){
        toggleConfigMSG("hide")
    })


    $(document).on("click",'.player .p2',function(){
        testMSG("hide")
    })


     $(document).on("click",'.player .p3',function(){
        toggleDebugMSG("show")
    })

    $(document).on("click",'.player .p4',function(){
        toggleDebugMSG("hide")
    })
})
   