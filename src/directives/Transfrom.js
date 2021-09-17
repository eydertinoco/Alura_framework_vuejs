import Vue from "vue";

Vue.directive('meu-transfrom', {

    bind(el, binding, vnode) {
        
        let current = 0;
        el.addEventListener('dblclick', function() {
            let incremento = 0;
            let animate = false;

            if (binding.value) {
                incremento = binding.value.incremento;
                animate = binding.value.animate;
            }

            //let incremento = binding.value || 90;
            current+=incremento;
            //el.style.transition = `transform 0.5s`;
            el.style.transform = `rotate(${current}deg)`;
            if(animate) el.style.transition = `transform 0.5s`;
        })

    }

});