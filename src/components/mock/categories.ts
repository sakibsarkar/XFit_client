import {
  FaBicycle,
  FaChild,
  FaDumbbell,
  FaHome,
  FaMedkit,
  FaRunning,
  FaTools,
  FaTree,
  FaTshirt,
  FaYoast,
} from "react-icons/fa";
import { IconType } from "react-icons/lib";

export interface ICategory {
  label: string;
  Icon: IconType;
}

export const categories: ICategory[] = [
  { label: "Cardio Equipment", Icon: FaRunning },
  { label: "Strength Training", Icon: FaDumbbell },
  { label: "Cycling", Icon: FaBicycle },
  { label: "Yoga and Pilates", Icon: FaYoast },
  { label: "Home Gym Essentials", Icon: FaHome },
  { label: "Fitness Accessories", Icon: FaTools },
  { label: "Recovery and Wellness", Icon: FaMedkit },
  { label: "Apparel and Footwear", Icon: FaTshirt },
  { label: "Outdoor Fitness", Icon: FaTree },
  { label: "Kids' Fitness", Icon: FaChild },
];
