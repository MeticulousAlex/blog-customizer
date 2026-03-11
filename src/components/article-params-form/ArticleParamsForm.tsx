import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (
				isOpen &&
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleOutsideClick);
		return () => document.removeEventListener('mousedown', handleOutsideClick);
	}, [isOpen]);

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		onApply(formState);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
	};

	return (
		<div ref={containerRef}>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)} />
			<aside className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(value) =>
							setFormState((prev) => ({ ...prev, fontFamilyOption: value }))
						}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(value) =>
							setFormState((prev) => ({ ...prev, fontSizeOption: value }))
						}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={(value) =>
							setFormState((prev) => ({ ...prev, fontColor: value }))
						}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(value) =>
							setFormState((prev) => ({ ...prev, backgroundColor: value }))
						}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(value) =>
							setFormState((prev) => ({ ...prev, contentWidth: value }))
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
