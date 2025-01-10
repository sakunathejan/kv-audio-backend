import Review from "../models/review.js";

export async function addReview(req, res) {
    try {
        if (req.user == null) {
            res.status(401).json({ message: "Please login and try again" });
            return;
        }

        const data = req.body;

        data.name = `${req.user.firstName} ${req.user.lastName}`;
        data.profilePicture = req.user.profilePicture;
        data.email = req.user.email;

        const newReview = new Review(data);
        await newReview.save();

        res.json({ message: "Review added successfully" });
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
}

export async function getReviews(req, res) {
    try {
        const user = req.user;

        if (user == null || user.role !== "admin") {
            const reviews = await Review.find({ isApproved: true });
            res.json(reviews);
            return;
        }

        if (user.role === "admin") {
            const reviews = await Review.find();
            res.json(reviews);
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
}

export async function deleteReview(req, res) {
    try {
        const email = req.params.email;

        if (req.user == null) {
            res.status(401).json({ message: "Please login and try again" });
            return;
        }

        if (req.user.role === "admin") {
            await Review.deleteOne({ email });
            res.json({ message: "Review deleted successfully" });
            return;
        }

        if (req.user.role === "customer" && req.user.email === email) {
            await Review.deleteOne({ email });
            res.json({ message: "Review deleted successfully" });
            return;
        }

        res.status(401).json({ message: "You are not authorized to delete this review" });
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
}

export async function approveReview(req, res) {
    try {
        const email = req.params.email;

        if (req.user == null) {
            res.status(401).json({ message: "Please login and try again" });
            return;
        }

        if (req.user.role === "admin") {
            await Review.updateOne({ email }, { isApproved: true });
            res.json({ message: "Review approved successfully" });
        } else {
            res.status(401).json({ message: "Only admins can approve reviews" });
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
}
