import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpenIcon, VideoCameraIcon, BellIcon, CpuChipIcon } from '@heroicons/react/24/outline';
import { LanguageContext } from '../contexts/LanguageContext';

const products = [
	{
		title: 'Trading Books',
		description:
			'Comprehensive guides on meme coin trading strategies, market analysis, and proven techniques that have helped thousands of traders succeed.',
		icon: BookOpenIcon,
	},
	{
		title: 'Video Courses',
		description:
			'In-depth video tutorials covering everything from basics to advanced trading strategies, with real-world examples and case studies.',
		icon: VideoCameraIcon,
	},
	{
		title: 'Signal Groups',
		description:
			'Join our exclusive community for real-time trading signals, market insights, and direct access to expert analysis.',
		icon: BellIcon,
	},
	{
		title: 'Trading Bots',
		description:
			'Automated trading solutions with proven algorithms designed specifically for meme coin markets and volatility patterns.',
		icon: CpuChipIcon,
	},
];

const Products = () => {
	const { getText } = useContext(LanguageContext);
	const navigate = useNavigate();

	const handleLearnMore = (title) => {
		if (title === 'Trading Books') {
			navigate('/books');
			return;
		}
		if (title === 'Video Courses') {
			navigate('/videos');
			return;
		}
		if (title === 'Signal Groups') {
			navigate('/signals');
			return;
		}
		if (title === 'Trading Bots') {
			navigate('/bots');
			return;
		}
		// Add more category navigation logic here if needed
	};

	return (
		<section className="py-20 px-4 bg-gray-50 dark:bg-dark-900">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-16">
					<h2 className="text-4xl font-black text-black dark:text-black mb-4">
						{getText('productsTitle')}
					</h2>
					<p className="text-black dark:text-black max-w-2xl mx-auto">
						{getText('aboutDescription')}
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{products.map((product, index) => (
						<motion.div
							key={product.title}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}
							className="crypto-card"
						>
							<product.icon className="h-12 w-12 text-primary mb-4" />
							<h3 className="text-xl font-black mb-2 dark:font-black text-black dark:text-black">{product.title}</h3>
							<p className="text-black font-semibold mb-6 dark:font-bold dark:text-black">{product.description}</p>
							<div className="flex justify-center">
								<button className="btn btn-outline w-full hover:btn-primary transition-all duration-300" onClick={() => handleLearnMore(product.title)}>
									Learn More
								</button>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Products;