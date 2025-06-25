'use client'
import PageContainer from "./ui/page_container";

import { useEffect, useRef } from "react";
import { animate } from "animejs";
import { Character, IntroductionText, PlayGuide } from "./ui/introductionComponents";
import dynamic from "next/dynamic";

const Tree = dynamic(() => import('./ui/introductionComponents').then(mod => mod.Tree), { ssr: false });

export interface LeafConfig {
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

	const playGuideRef = useRef<HTMLDivElement>(null);
	const moveControlRef = useRef<HTMLSpanElement>(null);

	return (
		<PageContainer color="#effcb7" className="items-end flex-col sm:flex-row " >
			{/* Tree interaction section */}
			<div className="absolute flex w-full left-0 top-0 sm:hidden">
				<IntroductionText moveControlRef={moveControlRef} />
			</div>
			<div ref={TreeAnimateRef} className="relative w-full h-full sm:w-[clamp(14rem,45%,999rem)] sm:h-[calc(100%-5rem)]">
				{/* Tree image section */}
				<Tree
					leafConfigs={leafConfigs} 
					LeafRefs={LeafRefs} 
					LeafRotateRefs={LeafRotateRefs} 
					TreeContainerRef={TreeContainerRef}
				/>
				<PlayGuide playGuideRef={playGuideRef} moveControlRef={moveControlRef} />
			</div>
			<div className="flex flex-1 ml-[5%] w-full h-full">
				<IntroductionText moveControlRef={moveControlRef} />
			</div>
			<Character characterRef={CharacterRef} />
		</PageContainer>
	)
}
export default Introduction;
