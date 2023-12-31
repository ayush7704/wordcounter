const tm = gsap.timeline()
tm.from('nav', {
    opacity: 0,
    duration: 0.3
}).from('.h2,.click,#textarea,#char,#word', {
    y: -100,
    duration: 1,
    delay: 0.4,
    opacity: 0,
    // fontSize: '1.3rem',
    stagger: 0.3
}).from('.radial', {
    top: '-100%',
    duration: 0.6,
    ease: 'back',
}).to('.copytextbtn', {
    opacity: 1,
    scale: 1,
    duration: 0.5,
    delay: -0.2
    // .from was not working in this
}).to('.Toggle-btn', {
    left: 0,
    ease: 'back',
    duration: 1
})


document.getElementById('textarea').addEventListener('input', function () {
    let char = document.getElementById('char');
    let word = document.getElementById('word');

    let value = this.value;
    let valuel = value.length;

    let values = value.split(' ')
    console.log(values.length)

    let round = document.querySelector('.round')
    if (round.classList.contains('toggler-round')) {
        char.innerHTML = valuel <= 1 ? valuel + ' character ' : char.innerHTML = valuel + ' characters '
    }
    else {
        // the default value of value.split(' ') is 1 so if there is 5 spaces in the paragraph they will be 6 
        char.innerHTML = (valuel - (values.length - 1)) <= 1 ? valuel - (values.length - 1) + ' character' : valuel - (values.length - 1) + ' characters'
    }

    let valuesf = values.filter((value) => value != '')
    word.innerHTML = valuesf.length <= 1 ? valuesf.length + ' word' : valuesf.length + ' words'

})
const click = document.querySelector('.click');
click.addEventListener('click', function () {


    const block = document.querySelector('.d-none')
    const navheight = document.querySelector('nav').offsetHeight;
    const navspan = document.querySelector('nav span')
    document.documentElement.style.setProperty('--topmargin', `${navheight}px`)

    const spanbfr = window.getComputedStyle(navspan, '::before')
    console.log(spanbfr.top)
    if (spanbfr.top == '-8px') {
        navspan.style.background = 'transparent'
        block.style.display = 'block'

        // gsap point 
        gsap.from('.d-none', {
            x: -150,
            opacity: 0,
            duration: 0.7,
        })
        document.documentElement.style.setProperty('--top', `0px`)
        document.documentElement.style.setProperty('--bottom', `0px`)
        document.documentElement.style.setProperty('--rotatebfr', `135deg`)
        document.documentElement.style.setProperty('--rotateaft', `-135deg`)
    }
    else {
        navspan.style.background = ''
        block.style.display = 'none'
        document.documentElement.style.setProperty('--top', `-8px`)
        document.documentElement.style.setProperty('--bottom', `-8px`)
        document.documentElement.style.setProperty('--rotatebfr', `0deg`)
        document.documentElement.style.setProperty('--rotateaft', `0deg`)
    }

})
const copy = document.querySelectorAll('.copy');
copy.forEach(event => {
    event.addEventListener('click', (e) => {
        let textarea = document.querySelector('textarea')
        // textarea text copied 
        if (event.classList.contains('copytextbtn')) {
            navigator.vibrate(200, 100)
            navigator.clipboard.writeText(textarea.value)
            let copytext = document.querySelector('.copytext');
            setTimeout(() => {
                // if the character length is 0 then nothing will be copy come or all text copy 
                if (document.querySelector('#char').innerHTML == '0' || document.querySelector('#char').innerHTML == '0 character') {
                    copytext.innerText = 'Nothing To Copy!'
                    copytext.style.display = 'block'
                    console.log('in')
                } else {
                    copytext.innerText = 'All Text Copied!'
                    copytext.style.display = 'block'
                    console.log('out')
                }
            }, 100)
            setTimeout(() => {
                copytext.style.display = 'none'
            }, 1500)
            gsap.fromTo('.radial', {
                rotate: 64
            }, { rotate: 360, duration: 1 })
        }
        // number copied 
        else {
            e.preventDefault()
            navigator.vibrate(200, 100)
            navigator.clipboard.writeText(9754742477)
            setTimeout(() => {
                document.querySelector('.copytext').innerText = 'Phone Number Copied'
                document.querySelector('.copytext').style.display = 'block'
            }, 100)
            setTimeout(() => {
                document.querySelector('.copytext').style.display = 'none'
            }, 1500)
        }
    })
})

// toggle-btnr ====
function toggler() {
    document.querySelectorAll('.Toggle-btn').forEach((btn) => {
        btn.addEventListener('click', function () {
            let word = document.getElementById('word');
            let value = document.querySelector('textarea').value;
            let valuel = document.querySelector('textarea').value.length;
            let values = value.split(' ')
            let valuesf = values.filter((value) => value != '')
            let round = document.querySelector('.round')

            round.classList.toggle('toggler-round')

            if (round.classList.contains('toggler-round')) {
                char.innerHTML = valuel <= 1 ? valuel + ' character ' : char.innerHTML = valuel + ' characters '
                word.innerHTML = valuesf.length <= 1 ? valuesf.length + ' word' : valuesf.length + ' words'
            }

            else {
                // the default value of value.split(' ') is 1 so if there is 5 spaces in the paragraph they will be 6 
                char.innerHTML = (valuel - (values.length - 1)) <= 1 ? valuel - (values.length - 1) + ' character' : valuel - (values.length - 1) + ' characters'
                word.innerHTML = valuesf.length <= 1 ? valuesf.length + ' word' : valuesf.length + ' words'
            }
        })
    })
}
toggler()