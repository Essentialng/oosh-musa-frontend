import { useState } from 'react'
import { useAppSelector } from '../redux/ReduxType'
import StepOne from './updateProfile/StepOne'
import StepTwo from './updateProfile/StepTwo'
import StepThree from './updateProfile/StepThree'
import StepFour from './updateProfile/StepFour'
import StepList from '../components/molecules/multistep/StepList'
import Background from '../assets/profile/back5.jpeg'
import { useSearchParams } from 'react-router-dom'


const UpdatePage = () => {

    const [currentStep, setCurrentStep] = useState(1)
    const isDark = useAppSelector((state)=>state.theme.isDark)
    const [searchParams, setSearchParams] = useSearchParams()

    const id = searchParams.get('id') || ''
    const email = searchParams.get('email') || ''
    const step = searchParams.get('step')


    const renderStep = ()=>{
            switch (currentStep) {
                case 1:
                    return <StepOne id={id} step={step}/>
                    break;
                case 2:
                    return <StepTwo id={id} step={step}/>
                    break;
                case 3:
                    return <StepThree id={id} step={step}/>
                    break;
                case 4:
                    return <StepFour id={id} step={step}/>
                    break;
                default:
                    break;
            }
    }

    const handleSelect = (number:number)=>{
        setCurrentStep(number)
    }

  return (
    <div>
        <section className={`w-full relative text-sm border-l-2 border-[] flex items-start justify-center`}>
            {/* left side */}
            <div style={{backgroundImage: `url(${Background})`}} className={`flex sticky left-0 items-start flex-col gap-10 justify-center w-1/3 p-5 text-white`}>
                <h1>Update your profile</h1>

                {/* steps list */}
                <ul className='h-[500px]'>
                    <li className='flex items-start justify-start gap-2 h-1/5'>
                        <StepList handleClick={handleSelect} isDark={isDark} currentStep={currentStep} hasLink={true} stepNumber={1}/>
                        <span>Personal Information</span>
                    </li>
                    <li className='flex items-start justify-start gap-2 h-1/5'>
                        <StepList handleClick={handleSelect} isDark={isDark} currentStep={currentStep} hasLink={true} stepNumber={2}/>
                        <span>Eduaction</span>
                    </li>
                    <li className='flex items-start justify-start gap-2 h-1/5'>
                        <StepList handleClick={handleSelect} isDark={isDark} currentStep={currentStep} hasLink={true} stepNumber={3}/>
                        <span>Work Experience</span>
                    </li>
                    <li className='flex items-start justify-start gap-2 h-1/5'>
                        <StepList handleClick={handleSelect} isDark={isDark} currentStep={currentStep} stepNumber={4}/>
                        <span>Photo</span>
                    </li>
                </ul>

            </div>    
            {/* right side */}
            <div className={`w-2/3 p-5 ${isDark ? 'bg-darkBg' : 'bg-white'}`}>
                {
                    renderStep()
                }
            </div>
        </section>
    </div>
  )
}

export default UpdatePage