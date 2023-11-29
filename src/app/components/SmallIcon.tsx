import React, {FC, ReactNode} from 'react';


interface SmallIconProps {
    icon: ReactNode,
    size?: string,
}

const SmallIcon: FC<SmallIconProps> = ({ icon, size }) => (
    <div className={`text-${size ? size : '2'} text-lightly hover:text-blue transition-all duration-200 cursor-pointer`}>{icon}</div>
);

export default SmallIcon;
