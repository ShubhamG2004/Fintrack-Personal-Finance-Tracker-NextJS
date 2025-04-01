import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";


function Hero() {
    return(
        <section className="bg-gray-50 flex flex-col items-center">
             <div className="flex flex-col overflow-hidden">
                <ContainerScroll
                    titleComponent={
                    <>
                        <h1 className="text-4xl font-semibold text-black dark:text-white">
                        Unleash the power of <br />
                        <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                            Scroll Animations
                        </span>
                        </h1>
                    </>
                    }
                >
                    <Image
                    src={`/linear.webp`}
                    alt="hero"
                    height={720}
                    width={1400}
                    className="mx-auto rounded-2xl object-cover h-full object-left-top"
                    draggable={false}
                    />
                </ContainerScroll>
                </div>
        </section>
    )
}

export default Hero;