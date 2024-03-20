interface CartItem {
    product_id: string;
    product_name: string;
    description: string;
    price: number;
    quantity: number;
    GST: number;
    image_src: string;
    tags: string[];
    Customizations_Available: string[];
    Customization_Comments: string;
    Customization_Chosen: string;
    product_story: string;
    product_story_title: string;
}

interface Cart {
    [key: string]: CartItem;
}

export type { CartItem, Cart }
