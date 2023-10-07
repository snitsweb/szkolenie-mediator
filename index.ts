export class Step {
    constructor (
        public readonly alias: string
    ) {}

}

export class PM {
    public currentStep: Step

    constructor (
        private steps: Step[]
    ) {}

    changeStep (alias: string) {

    }
}

export class Quiz {

}

export class ProgressBarStep {
    // name: string
    // active: boolean
    // disabled: boolean
    constructor (
        public readonly alias
    ) {}


}

export class ProgressBar {
    current: ProgressBarStep

    callbacks: Array<(alias: string) => void> = []

    constructor (
        private steps: ProgressBarStep[]
    ) {}


    changeCurrentStep (alias: string) {

    }

    changeStepsStatus (data: Array<{ alias:string, disabled: boolean }>) {

    }

    observe (callback: (alias: string) => void) {
        this.callbacks.push(callback)
    }

    clickHandler (alias: string) {
        this.callbacks.forEach(cb => {
            cb(alias)
        });
    }
}


export class ProgressBarPMMediator {
    constructor (
        private progressbar: ProgressBar,
        private pm: PM
    ) {
        this.progressbar.observe(this.progressBarStepChangeHandler.bind(this))
    }

    progressBarStepChangeHandler (alias: string) {
        this.pm.changeStep(alias)
    }

    update () {
    }
}

// To jest kawałek kodu tworzący nam obiekty
// jest on brzydki i nie powinieneś sie nad nim skupiać bo będziemy nad nim pracować w przyszłości
const pm = new PM([
    new Step('contat_data'),
    new Step('quiz'),
    new Step('cv'),
])
const progressBar = new ProgressBar([
    new ProgressBarStep('contat_data'),
    new ProgressBarStep('quiz'),
    new ProgressBarStep('cv'),
])

const mediator = new ProgressBarPMMediator(progressBar, pm)


// Twoim zadaniem jest zimplementowanie komunikacji pomiędzy obiektami pm oraz progressBar przy uzyciu klasy ProgressBarPMMediator

// Po dobrze napisanej integracji ponizsze console.logi powinny zwrócić true

// ten test pokazuje sytuacje gdy to PM chce zmienić krok (np. poniewaz kliknięto przycisk next)
pm.changeStep('quiz')
console.log(progressBar.current.alias === 'quiz')
console.log(pm.currentStep.alias === 'quiz')

// ten test pokazuje sytuacje gdy to progress bar chce zmienić krok (np. poniewaz kliknięto w krok na progress barze)
progressBar.clickHandler('cv')
console.log(pm.currentStep.alias === 'cv')
console.log(progressBar.current.alias === 'cv')