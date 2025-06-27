
import VisionAndImpactSVG from '../SVGComponents/VisionAndImpactSVG'
export function VisionAndImpact() {
  return (
    <div className="my-20 relative w-full">
        <VisionAndImpactSVG/>
        <div className="md:absolute md:right-10 md:top-[20%] md:w-[50%] w-full flex justify-center mt-10">
            <div className="w-[90%]">
            <h2 className="text-3xl font-[Montesrrat] text-[#8c3bc3] md:text-right text-pretty mb-5">Vision & Impact</h2>
            <p className="text-white text-lg font-[Montesrrat] text-bold md:text-right text-pretty mb-10 ">Rebuilding the way India learns—together</p>
            <p className="text-white  md:text-right mb-10 text-pretty">Purple envisions a world where knowledge is free, learning is purpose-driven, and students are empowered to lead—not just follow. We’re creating a public learning infrastructure that belongs to everyone, not just institutions</p>
            </div>
        </div>
        <div className=" w-full flex justify-center mt-10 md:mt-20">
            <div className="w-[90%] flex flex-row justify-between space-x-5">
                <div className='text-white md:text-4xl text-lg'>
                    <p>10000+</p>
                    <p>Learners</p>
                </div> 
                 <div className='text-white md:text-4xl text-lg'>
                    <p>30+</p>
                    <p>Communities</p>
                </div>
                 <div className='text-white md:text-4xl text-lg'>
                    <p>388+ </p>
                    <p>Mentors</p>
                </div>   
            </div>
            </div>
    </div>
  )
}

