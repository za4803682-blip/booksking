import os
import json
import time
import urllib.request
import urllib.parse
import firebase_admin
from firebase_admin import credentials, db

# Initialize Firebase Cloud Connection with Auto-Sync
DATABASE_URL = "https://booksking-default-rtdb.firebaseio.com/"

if not firebase_admin._apps:
    # Uses GitHub Action environment or default credentials if configured
    try:
        cred = credentials.ApplicationDefault()
        firebase_admin.initialize_app(cred, {
            'databaseURL': DATABASE_URL
        })
    except Exception:
        firebase_admin.initialize_app(options={
            'databaseURL': DATABASE_URL
        })

print("[INFO] BOOKSKING Autonomous Mega-Bot Initialized Successfully.")

# Comprehensive Amazon Affiliate Hub Mapping across 22+ Departments
AMAZON_DEPARTMENTS_MAP = {
    "Shoes Department": "https://www.amazon.com/s?k=bestselling+shoes+footwear&tag=booksking-20",
    "Clothing Department": "https://www.amazon.com/s?k=trending+fashion+clothing&tag=booksking-20",
    "Electronics": "https://www.amazon.com/s?k=top+rated+electronics+gadgets&tag=booksking-20",
    "Video Games": "https://www.amazon.com/s?k=latest+video+games+releases&tag=booksking-20",
    "PlayStation Hub": "https://www.amazon.com/s?k=playstation+5+consoles+games&tag=booksking-20",
    "Smartphones": "https://www.amazon.com/s?k=latest+smartphones+unlocked&tag=booksking-20",
    "Watches": "https://www.amazon.com/s?k=luxury+wrist+watches+men+women&tag=booksking-20",
    "Perfumes": "https://www.amazon.com/s?k=bestselling+luxury+perfumes&tag=booksking-20",
    "Cosmetics": "https://www.amazon.com/s?k=professional+cosmetics+makeup&tag=booksking-20",
    "Home Appliances": "https://www.amazon.com/s?k=smart+home+appliances&tag=booksking-20",
    "Sports Fitness": "https://www.amazon.com/s?k=home+gym+fitness+equipment&tag=booksking-20",
    "Books": "https://www.amazon.com/s?k=new+york+times+bestselling+books&tag=booksking-20",
    "Kitchenware": "https://www.amazon.com/s?k=modern+kitchenware+gadgets&tag=booksking-20",
    "Home Decor": "https://www.amazon.com/s?k=aesthetic+home+decor+furniture&tag=booksking-20",
    "Toys": "https://www.amazon.com/s?k=popular+toys+and+hobbies+2026&tag=booksking-20",
    "Car Accessories": "https://www.amazon.com/s?k=innovative+car+electronics+accessories&tag=booksking-20",
    "Stationery": "https://www.amazon.com/s?k=premium+office+supplies+stationery&tag=booksking-20",
    "Laptops": "https://www.amazon.com/s?k=high+performance+laptops+gaming&tag=booksking-20",
    "Sunglasses": "https://www.amazon.com/s?k=designer+polarized+sunglasses&tag=booksking-20",
    "Food & Drinks": "https://www.amazon.com/s?k=gourmet+food+beverages&tag=booksking-20",
    "Personal Care": "https://www.amazon.com/s?k=advanced+personal+care+devices&tag=booksking-20",
    "Mega Deals": "https://www.amazon.com/s?k=amazon+lightning+deals+today&tag=booksking-20"
}

def sync_amazon_departments_to_cloud():
    """Dynamically pushes and updates all 22+ Amazon department live links to Firebase Cloud Database"""
    try:
        ref = db.reference("autonomous_sync/amazon_departments")
        ref.set(AMAZON_DEPARTMENTS_MAP)
        print("[SUCCESS] All 22+ Amazon departments synchronized with Cloud successfully.")
    except Exception as e:
        print(f"[ERROR] Failed to sync departments: {e}")

def monitor_and_analyze_users():
    """Analyzes real-time user activity, purchase volumes, and tracking logs from Firebase"""
    try:
        users_ref = db.reference("registered_users")
        users_data = users_ref.get()
        
        if users_data:
            total_users = len(users_data)
            total_sales_volume = 0
            print(f"\n[ANALYTICS REPORT] Scanning {total_users} active user records...")
            
            for user_key, info in users_data.items():
                username = info.get("username", "Unknown")
                purchase = float(info.get("purchaseAmount", 0))
                visits = info.get("visitsCount", 1)
                dept = info.get("department", "General")
                total_sales_volume += purchase
                print(f" -> User: {username} | Visits: {visits} | Dept: {dept} | Purchases: ${purchase}")
            
            print(f"[SUMMARY] Global Platform Sales Volume: ${total_sales_volume}\n")
        else:
            print("[INFO] No user engagement records found yet.")
    except Exception as e:
        print(f"[ERROR] Analytics scan failed: {e}")

if __name__ == "__main__":
    print("[STARTING] Running BOOKSKING Autonomous Intelligence Loop...")
    sync_amazon_departments_to_cloud()
    monitor_and_analyze_users()
    print("[DONE] Bot execution cycle completed successfully.")
            
