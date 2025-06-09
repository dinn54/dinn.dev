'use client'
import Image from "next/image";
import PageContainer from "./ui/page_container";
import LeafImage from "@public/leaf.svg"
import TreeImage from "@public/tree.png"
import { useEffect, useRef } from "react";
import { animate } from "animejs";
import CharacterImage from "@public/character2.svg"

interface LeafConfig {
	startX: number;
	delay: number;
	duration: number;
	swayIntensity: number;
}

const Introduction = () => {
	const TreeAnimateRef = useRef<HTMLDivElement>(null)
	const TreeContainerRef = useRef<HTMLDivElement>(null) // 트리 컨테이너 참조 추가
	const leafCountRef = useRef(0);

	const LeafRefs = useRef<(HTMLDivElement | null)[]>([]);
	const LeafRotateRefs = useRef<(HTMLDivElement | null)[]>([]);
	const leafConfigs :LeafConfig[] = [
		{ startX: 20 + Math.random() * 38, delay: 0, duration: 10000, swayIntensity: 1 },
		{ startX: 20 + Math.random() * 38, delay: 1500, duration: 12000, swayIntensity: 0.8 },
		{ startX: 20 + Math.random() * 38, delay: 3000, duration: 15000, swayIntensity: 1.2 },
		{ startX: 20 + Math.random() * 38, delay: 4500, duration: 9000, swayIntensity: 0.9 },
		{ startX: 20 + Math.random() * 38, delay: 6000, duration: 8000, swayIntensity: 1.1 },
		{ startX: 20 + Math.random() * 38, delay: 7500, duration: 10000, swayIntensity: 1.2 },
		{ startX: 20 + Math.random() * 38, delay: 9000, duration: 12000, swayIntensity: 0.9 },
		{ startX: 20 + Math.random() * 38, delay: 10500, duration: 15000, swayIntensity: 1.1 },
		{ startX: 20 + Math.random() * 38, delay: 12000, duration: 9000, swayIntensity: 0.8 },
		{ startX: 20 + Math.random() * 38, delay: 13500, duration: 10000, swayIntensity: 1.2 },
		{ startX: 20 + Math.random() * 38, delay: 15000, duration: 12000, swayIntensity: 0.9 },
		{ startX: 20 + Math.random() * 38, delay: 16500, duration: 15000, swayIntensity: 1.1 },
		{ startX: 20 + Math.random() * 38, delay: 18000, duration: 9000, swayIntensity: 0.8 },
		{ startX: 20 + Math.random() * 38, delay: 19500, duration: 10000, swayIntensity: 1.2 },
		{ startX: 20 + Math.random() * 38, delay: 21000, duration: 12000, swayIntensity: 0.9 },
		{ startX: 20 + Math.random() * 38, delay: 22500, duration: 15000, swayIntensity: 1.1 },
		{ startX: 20 + Math.random() * 38, delay: 24000, duration: 9000, swayIntensity: 0.8 },
		{ startX: 20 + Math.random() * 38, delay: 25500, duration: 10000, swayIntensity: 1.2 },
		{ startX: 20 + Math.random() * 38, delay: 27000, duration: 12000, swayIntensity: 0.9 },
	];

	const resetAndStartLeafAnimation = (index: number) => {
		const leafRef = LeafRefs.current[index];
		const leafRotateRef = LeafRotateRefs.current[index];

		if (!leafRef || !leafRotateRef || !TreeAnimateRef.current) return;
		
		leafRef.style.zIndex = '0';
		
		// startX를 나뭇잎 생성 영역 범위로 랜덤 설정 (25% ~ 75% 영역)
		leafConfigs[index].startX = 20 + Math.random() * 12; // 25~75 범위
		
		startLeafAnimation(index);
	}

	// Leaf Animation
	const startLeafAnimation = (index: number) => {
		const leafRef = LeafRefs.current[index];
		const leafRotateRef = LeafRotateRefs.current[index];
		const config = leafConfigs[index];

		if (!leafRef || !leafRotateRef || !TreeContainerRef.current) return;

		// 좌우 흔들림 애니메이션 (각기 다른 패턴)
		const swayAnimation = animate(leafRef, {
			translateX: [
				0, 
				30 * config.swayIntensity, 
				-20 * config.swayIntensity, 
				25 * config.swayIntensity, 
				-15 * config.swayIntensity, 
				10 * config.swayIntensity, 
				0
			],
			duration: config.duration,
			easing: 'easeInOutSine',
		});

		// Z축 회전 애니메이션
		const rotateZAnimation = animate(leafRef, {
			rotateZ: [
				0, 
				15 * config.swayIntensity, 
				-10 * config.swayIntensity, 
				20 * config.swayIntensity, 
				-15 * config.swayIntensity, 
				8 * config.swayIntensity, 
				0
			],
			duration: config.duration,
			easing: 'easeInOutSine',
		});

		// Y축 회전 애니메이션 (좌우 뒤집힘)
		const rotateYAnimation = animate(leafRotateRef, {
			rotateY: [0, 180, 360, 540, 720],
			duration: config.duration,
			easing: 'easeInOutSine',
		});

		// X축 회전 애니메이션 (상하 뒤집힘)
		const rotateXAnimation = animate(leafRotateRef, {
			rotateX: [0, 90, 180, 270, 360],
			duration: config.duration,
			easing: 'easeInOutSine',
		});

		// 트리 컨테이너를 기준으로 떨어지는 거리 계산
		const calculateFallDistance = () => {
			if (!leafRef || !TreeContainerRef.current) return 0;
			
			const leafRect = leafRef.getBoundingClientRect();
			const treeRect = TreeContainerRef.current.getBoundingClientRect();
			
			// 나뭇잎 현재 위치에서 트리 bottom까지의 거리
			const fallDistance = treeRect.bottom - leafRect.top;
			
			return fallDistance;
		};

		// 수직 낙하 애니메이션
		const fallAnimation = animate(leafRef, {
			translateY: [0, calculateFallDistance()-80],
			duration: config.duration,
			easing: 'easeInQuart',
			onUpdate: (currentAnimation) => {
				// 애니메이션 40% 지점에서 z-index 변경
				if (leafRef) {
					if (currentAnimation.progress >= 0.4) {
						leafRef.style.zIndex = '2';
					} else {
						leafRef.style.zIndex = '0';
					}
				}
			},
			onComplete: () => {

				setTimeout(() => {
					// 리셋 후 다시 시작
					if (leafRef) {
						leafRef.style.zIndex = '0';
					}
					fallAnimation.reset();
					rotateYAnimation.reset();
					rotateXAnimation.reset();
					swayAnimation.reset();
					rotateZAnimation.reset();

					
					// 다시 애니메이션 시작 (각기 다른 딜레이로)
					setTimeout(() => startLeafAnimation(index), config.delay);
				}, 30000);
			}
		});
	};

	useEffect(() => {
		// 모든 나뭇잎 애니메이션 시작 (각기 다른 딜레이)
		leafConfigs.forEach((config, index) => {
			setTimeout(() => startLeafAnimation(index), config.delay + 1000);
		});
	}, []);

	const CharacterRef = useRef<HTMLDivElement>(null);
	const currentXRef = useRef(0);

	useEffect(() => {
		const pressedKeys = new Set<string>();
		const intervalRef = { current: null as NodeJS.Timeout | null };
		const speed = 3;
		const frameDuration = 8;
	
		const moveCharacter = () => {
			if (!CharacterRef.current) return;
			if (pressedKeys.has('ArrowLeft') || pressedKeys.has('a') || pressedKeys.has('A')) {
				currentXRef.current -= speed;
			}
			if (pressedKeys.has('ArrowRight') || pressedKeys.has('d') || pressedKeys.has('D')) {
				currentXRef.current += speed;
			}
			animate(CharacterRef.current, {
				translateX: currentXRef.current,
				duration: frameDuration,
				easing: 'linear',
			});
		};
	
		const startLoop = () => {
			if (!intervalRef.current) {
				intervalRef.current = setInterval(moveCharacter, frameDuration);
			}
		};
	
		const stopLoop = () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		};
	
		const findGetLeaf = () => {
			const currentCharacterLocation = CharacterRef.current?.getBoundingClientRect();
			if (!currentCharacterLocation) return;
			LeafRefs.current.forEach((leafRef, index) => {
				if (!leafRef) return;
				const leafLocation = leafRef.getBoundingClientRect();
				const distance = Math.sqrt(
					Math.pow(leafLocation.left- currentCharacterLocation.left, 2) +
					Math.pow(leafLocation.bottom - currentCharacterLocation.bottom, 2)
				);
				if (distance < 20) {
					animate(leafRef, {
						translateY: -10,
						duration: 1000,
						easing: 'easeOutExpo',
						onBegin: () =>{
							leafCountRef.current++;
						},
						onComplete: () =>{
							resetAndStartLeafAnimation(index);
						}
					});
				}
			});
		};
	
		const handleKeyDown = (e: KeyboardEvent) => {
			pressedKeys.add(e.key);
			if (['enter', 'Enter'].includes(e.key)) {
				findGetLeaf();
			}
			startLoop();
		};
	
		const handleKeyUp = (e: KeyboardEvent) => {
			pressedKeys.delete(e.key);
			if (
				!pressedKeys.has('ArrowLeft') &&
				!pressedKeys.has('a') &&
				!pressedKeys.has('A') &&
				!pressedKeys.has('ArrowRight') &&
				!pressedKeys.has('d') &&
				!pressedKeys.has('D')
				
			) {
				stopLoop();
			}
		};
	
		document.addEventListener('keydown', handleKeyDown);
		document.addEventListener('keyup', handleKeyUp);
	
		return () => {
			stopLoop();
			document.removeEventListener('keydown', handleKeyDown);
			document.removeEventListener('keyup', handleKeyUp);
		};
	}, []);
	
	return (
		<PageContainer color="#e1eebc">
			{/* Tree interaction section */}
			<div ref={TreeAnimateRef} className="relative w-[clamp(14rem,50%,999rem)] h-full">
				{/* Tree image section */}
				<Tree 
					leafConfigs={leafConfigs} 
					LeafRefs={LeafRefs} 
					LeafRotateRefs={LeafRotateRefs} 
					TreeContainerRef={TreeContainerRef}
				/>
				<PlayGuide />
			</div>
			<div className="relative flex flex-col w-[50%] h-full font-k-pretendard font-semibold text-3xl text-end pr-4">
				<div className="flex flex-col"><span className="text-base text-gray-400">USER:</span> <span>DINN(JOO)</span></div>
				<div className="flex flex-col"><span className="text-base text-gray-400">CLASS:</span> <span>FRONTEND ENGINEER</span></div>
				<div className="flex flex-col"><span className="text-base text-gray-400">WEAPON:</span> <span>CLEAN CODE, SMOOTH UX, INTERACTIVE</span></div>
				<div className="flex flex-col"><span className="text-base text-gray-400">STATUS:</span> <span>READY FOR DEPLOYMENT</span></div>
			</div>
			<Character characterRef={CharacterRef} />
		</PageContainer>
	)
}
export default Introduction;

const Tree = ({
	leafConfigs, 
	LeafRefs, 
	LeafRotateRefs, 
	TreeContainerRef
}: {
	leafConfigs: LeafConfig[], 
	LeafRefs: React.RefObject<(HTMLDivElement | null)[]>, 
	LeafRotateRefs: React.RefObject<(HTMLDivElement | null)[]>,
	TreeContainerRef: React.RefObject<HTMLDivElement | null>
}) => {
	return (
		<div 
			ref={TreeContainerRef}
			className="absolute bottom-0 left-0 sm:left-4 md:left-12 h-[70%] lg:h-[80%] xl:h-[95%] aspect-[2/3]"
		>
			<div className="relative w-full h-full z-[1]">
				<Image src={TreeImage} alt="tree" />
			</div>

			<FallingLeaf 
				leafConfigs={leafConfigs} 
				LeafRefs={LeafRefs} 
				LeafRotateRefs={LeafRotateRefs} 
			/>
		</div>
	)
}

const FallingLeaf = ({
	leafConfigs, 
	LeafRefs, 
	LeafRotateRefs, 
}: {
	leafConfigs: LeafConfig[], 
	LeafRefs: React.RefObject<(HTMLDivElement | null)[]>, 
	LeafRotateRefs: React.RefObject<(HTMLDivElement | null)[]>,
}) => {
	return (
		<>
		{leafConfigs.map((config, index) => (
			<div 
				key={index}
				ref={(el) => { LeafRefs.current[index] = el }}
				className={`absolute w-[2rem] sm:w-[2.5rem] md:w-[3rem] aspect-square z-[0]`}
				style={{ 
					top: `${14 + Math.random() * 12}%`, // 10%-40% 영역
					left: `${config.startX}%`,
					transformStyle: 'preserve-3d',
				}}
			>
				<div 
					ref={(el) => { LeafRotateRefs.current[index] = el }}
					style={{ 
						transformStyle: 'preserve-3d',
					}}
				>
					<Image src={LeafImage} alt={`leaf-${index}`} className="rotate-220" />
				</div>
			</div>
		))}
		</>
	)
}

const PlayGuide = () => {
	return (
		<div className="absolute flex w-[12rem] flex-col justify-center items-center bottom-[clamp(5rem,20%,10rem)] left-[clamp(1rem,10%,1rem)] text-sm text-black text-center" >
			<span className="text-xs sm:text-sm md:text-base font-regular stroke-2">{"Press Enter"}</span>
			<span className="text-xs sm:text-sm md:text-base font-regular stroke-2">{"Press Arrow or A/D"}</span>
		</div>
	)
}

// const LeafCounter = ({ countRef }: { countRef: React.RefObject<number> }) => {
// 	const [visibleCount, setVisibleCount] = useState(0);	
	
// 	useEffect(() => {
// 		const interval = setInterval(() => {
// 			setVisibleCount(countRef.current);
// 		}, 100); // 약간의 딜레이로 동기화

// 		return () => clearInterval(interval);
// 	}, [countRef]);

// 	return (
// 		<div className="absolute bottom-36 left-88 text-lg font-extrabold text-green-600 text-center resize-none" >
// 			<CountUp start={countRef.current} end={visibleCount} duration={0.1} />
// 		</div>
// 	)
// }

const Character = ({characterRef}: {characterRef: React.RefObject<HTMLDivElement | null>}) => {
	return (
		<div ref={characterRef} className="absolute transform w-[4rem] left-6 lg:left-10 bottom-[2rem] aspect-square z-[1]">
			<Image src={CharacterImage} alt="character" />
		</div>
	)
}