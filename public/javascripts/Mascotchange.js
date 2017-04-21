$(function(){
  $('#dragon-img').on('click',function(){
    var logo=document.getElementById('dragon-img');
    console.log(logo.src);
    if(logo.src=="https://res.cloudinary.com/dqn5eqmwt/image/upload/v1492759791/dragon_parent_1_j2belt.png"){
      logo.src="https://res.cloudinary.com/dqn5eqmwt/image/upload/v1492759791/dragon_parent_3_zbghmt.png";
    }
    else if(logo.src=="https://res.cloudinary.com/dqn5eqmwt/image/upload/v1492759791/dragon_parent_3_zbghmt.png"){
      logo.src="https://res.cloudinary.com/dqn5eqmwt/image/upload/v1492759791/dragon_parent_2_cudlvs.png";
    }
    else if(logo.src=="https://res.cloudinary.com/dqn5eqmwt/image/upload/v1492759791/dragon_parent_2_cudlvs.png"){
      logo.src="https://res.cloudinary.com/dqn5eqmwt/image/upload/v1492759791/dragon_parent_1_j2belt.png";
    }
    else if(logo.src=="https://res.cloudinary.com/dqn5eqmwt/image/upload/v1492759791/dragon_baby_1_uet7it.png"){
      logo.src="https://res.cloudinary.com/dqn5eqmwt/image/upload/v1492759791/dragon_baby_2_in2kqz.png";
    }
    else if(logo.src=="https://res.cloudinary.com/dqn5eqmwt/image/upload/v1492759791/dragon_baby_2_in2kqz.png"){
      logo.src="https://res.cloudinary.com/dqn5eqmwt/image/upload/v1492759791/dragon_baby_1_uet7it.png";
    }
    else if(logo.src=="https://res.cloudinary.com/dqn5eqmwt/image/upload/v1492759792/dragon_teen_3_wsouqo.png"){
      logo.src="https://res.cloudinary.com/dqn5eqmwt/image/upload/v1492759793/dragon_teen_2_uheotw.png";
    }
    else if(logo.src=="https://res.cloudinary.com/dqn5eqmwt/image/upload/v1492759793/dragon_teen_2_uheotw.png"){
      logo.src="https://res.cloudinary.com/dqn5eqmwt/image/upload/v1492759791/dragon_teen_1_lfgfgu.png";
    }
    else if(logo.src=="https://res.cloudinary.com/dqn5eqmwt/image/upload/v1492759791/dragon_teen_1_lfgfgu.png"){
      logo.src="https://res.cloudinary.com/dqn5eqmwt/image/upload/v1492759792/dragon_teen_3_wsouqo.png";
    }
  });
});
